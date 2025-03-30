import { compare, hash } from "bcrypt"
import { env } from "../config/env";

export const hashPassword = async (password: string): Promise<string> => {
    return await hash(password, env.SALT_ROUNDS);
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await compare(password, hashedPassword);
};