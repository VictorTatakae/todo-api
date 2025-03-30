import type ms from 'ms';
import { signToken } from '../../../../core/config/jwt';
import { hashPassword, verifyPassword } from '../../../../core/helpers/hash';
import type User from '../../../users/domain/entities/user';
import type UserRepository from '../../../users/domain/repositories/user_repository';
import type AuthRepository from '../../domain/repositories/auth.repository';

export default class AuthRepositoryImp implements AuthRepository {
	constructor(private readonly userRepository: UserRepository) {}
	async hashPassword(password: string): Promise<string> {
		return await hashPassword(password);
	}
	async comparePassword(plain: string, hashed: string): Promise<boolean> {
		return await verifyPassword(plain, hashed);
	}
	generateAccessToken(payload: Record<string, any>, expiresIn: ms.StringValue | undefined): string {
		return signToken(payload, expiresIn);
	}
	async register(username: string, email: string, password: string): Promise<User | null> {
		return await this.userRepository.create(username, email, password);
	}
}
