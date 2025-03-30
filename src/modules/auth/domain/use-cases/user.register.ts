import Conflict from '../../../../core/errors/conflict';
import InternalServer from '../../../../core/errors/internal.server';
import type User from '../../../users/domain/entities/user';
import type UserRepository from '../../../users/domain/repositories/user_repository';
import type { UserRegisterResponseDTO } from '../dtos/user.register.response.dto';
import type AuthRepository from '../repositories/auth.repository';

export default class UserRegister {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly userRepository: UserRepository,
	) {}
	async execute(username: string, email: string, password: string): Promise<UserRegisterResponseDTO> {
		const usernameAlreadyInUse = await this.userRepository.findByUsername(username);
		if (usernameAlreadyInUse) {
			throw new Conflict('Username already in use');
		}

		const emailAlreadyInUse = await this.userRepository.findByEmail(email);
		if (emailAlreadyInUse) {
			throw new Conflict('Email already in use');
		}

		const hashedPassword = await this.authRepository.hashPassword(password);

		const user = await this.authRepository.register(username, email, hashedPassword);
		if (!user) {
			throw new InternalServer('Failed to create user');
		}

		return {
			id: user.id ?? '',
			username: user.username,
			email: user.email
		};
	}
}
