import prisma from '@/prisma/prisma.js';

export function getReviewsNotSent() {
	return prisma.review.findMany({
		where: { sent: false }
	});
}
