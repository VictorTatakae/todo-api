import { z } from 'zod';

export const registerSchema = z.object({
	username: z.string().min(7),
	email: z.string().email().toLowerCase(),
	password: z.string().min(8),
});
