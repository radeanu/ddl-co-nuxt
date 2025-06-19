import { type RequestHandler } from 'express';

import { logger } from '@/config/index.js';
import { validationOptions } from '@/common/index.js';

import * as schema from './order.schema.js';
import * as service from './order.service.js';

export const postNewOrder: RequestHandler = (req, res, next) => {
	(async () => {
		const payload = await schema.createOrder.validate(req.body, validationOptions);

		const response = await service.createOrder(
			{
				cl_type: payload.cl_type,
				area_type: payload.area_type,
				area: payload.area,
				comment: payload.comment,
				calc_sum: payload.calc_sum,
				location: payload.location
			},
			{
				name: payload.name,
				phone: payload.phone
			},
			payload.services.map((s) => ({ name: s }))
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

export const postNewOrderCall: RequestHandler = (req, res, next) => {
	(async () => {
		const payload = await schema.createOrderCall.validate(
			req.body,
			validationOptions
		);

		const response = await service.createOrder(
			{
				cl_type: '',
				area_type: '',
				area: 0,
				comment: '',
				calc_sum: 0,
				isCall: true,
				location: payload.location
			},
			{
				name: payload.name,
				phone: payload.phone
			},
			[]
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
