import { z } from 'zod';

export const loginSchema = z
	.object({
		username: z.string().optional(),
		email: z.string().email().toLowerCase().optional(),
		password: z.string(),
	})
	.refine((data) => data.email || data.username, {
		message: 'You must provide either username or email.',
	});
