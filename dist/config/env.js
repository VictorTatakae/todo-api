"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(3000),
    SALT_ROUNDS: zod_1.z.coerce.number().default(10),
    DATABASE_URL: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
});
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error('Erro na validação das variáveis de ambiente:', parsedEnv.error.format());
    process.exit(1);
}
exports.env = parsedEnv.data;
