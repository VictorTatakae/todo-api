import express from 'express';
import { errorMiddleware } from './core/middlewares/error.middleware';
import authRoutes from './modules/auth/presentation/routes/auth.routes';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(errorMiddleware);

export default app;
