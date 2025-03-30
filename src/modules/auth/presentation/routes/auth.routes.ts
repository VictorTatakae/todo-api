import { Router } from 'express';
import prisma from '../../../../core/config/db';
import PrismaUserRepository from '../../../users/data/repositories/prisma.user.repository';
import AuthRepositoryImp from '../../data/repositories/auth.repository.imp';
import UserLogin from '../../domain/use-cases/user.login';
import UserRegister from '../../domain/use-cases/user.register';
import AuthController from '../controllers/auth.controller';

const router = Router();

const userRepository = new PrismaUserRepository(prisma);
const authRepository = new AuthRepositoryImp(userRepository);
const registerUseCase = new UserRegister(authRepository, userRepository);
const loginUseCase = new UserLogin(authRepository, userRepository);
const authController = new AuthController(registerUseCase, loginUseCase);

router.get('/');
router.post('/register', authController.register.bind(authController));
router.post('/login');

export default router;
