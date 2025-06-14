import cors from 'cors';
import type { Express } from 'express';

export default function (app: Express) {
	app.use(
		cors({
			origin: 'http://localhost:3000',
			credentials: true
		})
	);
}
