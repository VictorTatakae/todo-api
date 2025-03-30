import type { PrismaClient } from '@prisma/client';
import User from '../../domain/entities/user';
import type UserRepository from '../../domain/repositories/user_repository';

export default class PrismaUserRepository implements UserRepository {
	constructor(private readonly prisma: PrismaClient) {}
	async findAll(): Promise<User[] | null> {
		const users = await this.prisma.user.findMany();

		if (!users) return null;

		if (users.length === 0) return [];

		return users.map((user) => new User(user.id, user.username, user.email, user.password));
	}
	async findById(id: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: { id },
		});
		if (!user) return null;

		return new User(user.id, user.username, user.email, user.password);
	}
	async findByEmail(email: string): Promise<User | null> {
		const user = await this.prisma.user.findFirst({
			where: {
				email: {
					equals: email,
					mode: 'insensitive',
				},
			},
		});
		if (!user) return null;

		return new User(user.id, user.username, user.email, user.password);
	}
	async findByUsername(username: string): Promise<User | null> {
		const user = await this.prisma.user.findFirst({
			where: {
				username: {
					equals: username,
					mode: 'insensitive',
				},
			},
		});
		if (!user) return null;

		return new User(user.id, user.username, user.email, user.password);
	}
	async create(username: string, email: string, password: string): Promise<User | null> {
		const user = await this.prisma.user.create({
			data: {
				username: username,
				email: email,
				password: password,
			},
		});

		if (!user) return null;

		return new User(user.id, user.username, user.email, user.password);
	}
}
