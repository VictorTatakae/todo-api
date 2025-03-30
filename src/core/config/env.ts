import { z } from 'zod';

const envSchema = z.object({
	PORT: z.coerce.number().default(3000),
	SALT_ROUNDS: z.coerce.number().default(10),
	DATABASE_URL: z.string(),
	JWT_SECRET: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error('Erro na validação das variáveis de ambiente:', parsedEnv.error.format());
	process.exit(1);
}

export const env = parsedEnv.data;
