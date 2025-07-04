import prisma from '@/prisma/prisma.js';
import { LABELS } from '@/common/index.js';
import { logger } from '@/config/index.js';

export async function handleReviewValidation(rvId: number, valid: boolean) {
	try {
		const dbReview = await prisma.review.findFirst({
			where: { id: rvId }
		});

		if (!dbReview || dbReview?.status !== 'pending') {
			return { success: false, msg: 'Отзыв не найден или уже обработан' };
		}

		await prisma.review.update({
			where: { id: rvId },
			data: { status: 'validated', valid }
		});

		return { success: true, msg: '' };
	} catch (error) {
		logger.error({ title: 'handleReviewValidation', rvId, valid, error });
		return { success: false, msg: LABELS.error };
	}
}
