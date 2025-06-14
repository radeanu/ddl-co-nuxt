import { ValidationError } from 'yup';
import { type Request, type Response, type NextFunction, type Express } from 'express';

import { logger } from '@/config/index.js';

export default function (app: Express) {
	process.on('uncaughtException', (error) => {
		logger.error(error);
	});

	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		if (err instanceof ValidationError) {
			res.status(400).json({
				message: 'BAD_REQUEST',
				payload: err.errors
			});
			return;
		}

		logger.error(err);

		res.status(500).end('INTERNAL_SERVER_ERROR');
		return;
	});
}
