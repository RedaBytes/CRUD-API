import express from 'express';
import routes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { limiter } from './middleware/rateLimiter.js';

const app = express();

app.use(express.json());
app.use(limiter); 
app.use("/api/users", routes);
app.use(errorHandler);

export default app;