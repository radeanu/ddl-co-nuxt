import prisma from '@/prisma/prisma.js';

export function updateNotification(id: number, sent: boolean, log?: string) {
	return prisma.tgNotification.update({
		where: { id },
		data: { sent, log }
	});
}
