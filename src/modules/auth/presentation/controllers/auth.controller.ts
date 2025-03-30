import type { NextFunction, Request, Response } from 'express';
import type UserLogin from '../../domain/use-cases/user.login';
import type UserRegister from '../../domain/use-cases/user.register';
import { registerSchema } from '../validations/register.schema';

export default class AuthController {
	constructor(
		private registerUseCase: UserRegister,
		private loginUseCase: UserLogin,
	) {}
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const { username, email, password } = registerSchema.parse(req.body);
			const user = await this.registerUseCase.execute(username, email, password);
			res.status(201).json(user);
		} catch (error) {
			next(error);
		}
	}
}
