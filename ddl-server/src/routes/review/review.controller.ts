import { type RequestHandler } from 'express';

import { logger } from '@/config/index.js';
import { validationOptions } from '@/common/index.js';

import * as schema from './review.schema.js';
import * as service from './review.service.js';

export const postNewReview: RequestHandler = (req, res, next) => {
	(async () => {
		const payload = await schema.createReview.validate(req.body, validationOptions);

		const response = await service.createReview(
			{
				name: payload.name,
				rating: payload.rating,
				review: payload.review,
				location: payload.location
			},
			payload.key
		);

		if (!response.success) {
			return res.status(400).send(response.msg);
		}

		return res.status(200).send();
	})().catch((error) => {
		logger.error(error);
		return next(error);
	});
};

export const getReviewsList: RequestHandler = (req, res, next) => {
	(async () => {
		const list = await service.getReviews();

		return res.status(200).send(list ?? []);
	})().catch((error) => {
		logger.error(error);
		return next(error);
	});
};
