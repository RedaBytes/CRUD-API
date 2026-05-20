import express from 'express';
import routes from './routes/userRoutes.js';

const app = express();

app.use(express.json())

app.use("/api/users",routes);

export default app;