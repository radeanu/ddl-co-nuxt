import cors from 'cors';
import type { Express } from 'express';

import { env } from '@/config/index.js';

export default function (app: Express) {
	app.use(
		cors({
			origin: env.CORS,
			credentials: true
		})
	);
}
