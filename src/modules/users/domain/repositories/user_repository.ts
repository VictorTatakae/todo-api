import type User from '../entities/user';

export default interface UserRepository {
	findAll(): Promise<User[] | null>;
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	findByUsername(username: string): Promise<User | null>;
	create(username: string, email: string, password: string): Promise<User | null>;
}
