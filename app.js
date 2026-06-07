import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './src/routes/userRoutes.js';
import { errorHandler } from './src/middleware/errorHandling.js';
import { limiter } from './src/middleware/rateLimiter.js';

const app = express();
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(limiter); 
app.use("/api/users", routes);
app.use(errorHandler);

export default app;