import type User from '../../../users/domain/entities/user';

export default interface AuthRepository {
	hashPassword(password: string): Promise<string>;
	comparePassword(plain: string, hashed: string): Promise<boolean>;
	generateAccessToken(payload: Record<string, any>, expiresIn?: string): string;
	register(username: string, email: string, password: string): Promise<User | null>;
}
