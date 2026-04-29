import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import routes from "./routes/userRoutes.js"

const app = express();
dotenv.config();
app.use(bodyParser.json())

const PORT=process.env.PORT || 5000;
const MONGODB = process.env.MONGODB_URL;

mongoose.connect(MONGODB).then(() => {
    console.log("database connections established")
    app.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`)
    })
}).catch((error) => {
    console.log(error);
});
app.use("/api/user",routes);
