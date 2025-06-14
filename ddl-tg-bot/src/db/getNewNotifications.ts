import prisma from '@/prisma/prisma.js';

export function getNewNotifications() {
	return prisma.tgNotification.findMany({
		where: {
			sent: false
		},
		include: {
			Order: {
				include: {
					Client: true,
					OrderServices: true
				}
			}
		}
	});
}
