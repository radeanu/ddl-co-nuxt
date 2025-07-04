import { type Express } from 'express';
import { useErrorHandler } from '@/config/index.js';

import orderRoutes from './order/order.routes.js';
import reviewRoutes from './review/review.routes.js';

export default function (app: Express) {
	app.use('/api/order', orderRoutes);
	app.use('/api/review', reviewRoutes);

	useErrorHandler(app);
}
