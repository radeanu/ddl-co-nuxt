import moment from 'moment';
import { Prisma } from '@prisma/client';

import prisma from '@/prisma/prisma.js';
import { logger } from '@/config/index.js';
import { LOCATIONS } from '@/common/index.js';

export async function createReview(
	review: Omit<Prisma.ReviewCreateInput, 'Order'>,
	key?: string
) {
	return await prisma.$transaction(async (tx) => {
		try {
			let orderId = undefined;

			if (key?.length) {
				const dbOrder = await tx.order.findFirst({ where: { key } });
				orderId = dbOrder ? dbOrder.id : undefined;
			}

			await tx.review.create({
				data: {
					orderId,
					sent: false,
					status: 'pending',
					name: review.name,
					review: review.review,
					rating: review.rating,
					location: review.location
				}
			});

			return { success: true, msg: '' };
		} catch (error) {
			logger.error({ title: 'createReview', error });
			return { success: false, msg: 'Ошибка при добавлении отзыва' };
		}
	});
}

export async function getReviews() {
	try {
		const list = await prisma.review.findMany({
			where: { valid: true, status: 'validated' }
		});

		return list.map((l) => {
			return {
				name: l.name,
				review: l.review,
				rating: l.rating,
				createdAt: moment(l.createdAt).format('DD.MM.YYYY'),
				location:
					LOCATIONS.find((loc) => loc.value === l.location)?.name ??
					LOCATIONS[0].name
			};
		});
	} catch (error) {
		logger.error({ title: 'getReviews', error });
		return null;
	}
}
