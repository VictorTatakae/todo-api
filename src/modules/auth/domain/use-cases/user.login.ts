import BadRequest from '../../../../core/errors/bad.request';
import InvalidCredentials from '../../../../core/errors/invalid.credentials';
import type User from '../../../users/domain/entities/user';
import type UserRepository from '../../../users/domain/repositories/user_repository';
import type { UserLoginResponseDTO } from '../dtos/user.login.response.dto';
import type AuthRepository from '../repositories/auth.repository';

export interface UserLoginParams {
	username?: string;
	email?: string;
	password: string;
}

export default class UserLogin {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly userRepository: UserRepository,
	) {}
	async execute(params: UserLoginParams): Promise<UserLoginResponseDTO> {
		const { username, email, password } = params;

		if ((!username && !email) || (username && email)) {
			throw new BadRequest('You must provide either username or email, not both.');
		}

		let user: User | null = null;

		if (username) {
			user = await this.userRepository.findByUsername(username);
		} else if (email) {
			user = await this.userRepository.findByEmail(email);
		}

		if (!user) {
			throw new InvalidCredentials();
		}

		const isPasswordValid = await this.authRepository.comparePassword(password, user.password);

		if (!isPasswordValid) {
			throw new InvalidCredentials();
		}

		const payload = { id: user.id };
		const token = this.authRepository.generateAccessToken(payload, '30s');

		return {
			user: {
				id: user.id ?? '',
				username: user.username,
				email: user.email,
			},
			token: token,
		};
	}
}
