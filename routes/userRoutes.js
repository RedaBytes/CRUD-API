import express from 'express';
import { create, fetch ,update} from '../controller/userController.js';

const router = express.Router();
router.post('/create', create);
router.get('/fetch', fetch);
router.put('/update/:id', update);
export default router;                          