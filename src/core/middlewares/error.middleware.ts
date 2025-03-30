import { Prisma } from '@prisma/client';
import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import AppErrors from '../../core/errors/app.erros';

export const errorMiddleware: ErrorRequestHandler = (err, req, res, _next): void => {
	if (err instanceof ZodError) {
		res.status(400).json({
			status: 'error',
			message: 'Validation failed',
			errors: err.flatten().fieldErrors,
		});
		return;
	}

	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		if (err.code === 'P2002') {
			res.status(409).json({
				status: 'error',
				message: `Duplicate field: ${err.meta?.target}`,
			});
			return;
		}

		res.status(500).json({
			status: 'error',
			message: 'Database error',
			code: err.code,
		});
		return;
	}

	if (err instanceof AppErrors) {
		res.status(err.code).json({
			status: 'error',
			message: err.message,
		});
		return;
	}

	console.error('Unexpected error:', err);

	res.status(500).json({
		status: 'error',
		message: 'Internal server error',
	});
	return;
};
