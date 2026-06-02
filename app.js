import express from 'express';
import routes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandling.js';

const app = express();

app.use(express.json())

app.use("/api/users",routes);
app.use(errorHandler)

export default app;