import userModel from "../model/userModel.js";
export const create = async (req, res) => {
    try {
        const userData = req.body;
        const newuser = new userModel(userData);
        const { email } = newuser;
         
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const usersaved = await newuser.save();
        res.status(201).json(usersaved);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while saving user data" });
    }
};

export const fetch = async (req, res) => {
    try {
        const users = await userModel.find();
        if(users.length===0){
            return res.status(404).json({message:"no users found"})
        }
        res.status(200).json(users);


    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching user data" });
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await userModel.findById({ id });
        if (!userExist) {
            return res.status(404).json({ message: "User doesn't exist" });
        }
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};
    export const deleteUser = async(req,res)=>{

             const id = req.params.id;
        const userExist = await userModel.findByIdAndDelete({ id });
        if (!userExist) {
            return res.status(404).json({ message: "User doesn't exist" });
        }
        res.status(200).json({message : "deleted successfully",userExist});
    };
