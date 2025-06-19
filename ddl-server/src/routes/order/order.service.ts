import { Prisma, type PrismaClient } from '@prisma/client';

import prisma from '@/prisma/prisma.js';
import { logger } from '@/config/index.js';

export async function createOrder(
	order: Omit<Prisma.OrderCreateInput, 'Client'>,
	client: Prisma.ClientCreateInput,
	services: Array<Omit<Prisma.OrderServicesCreateInput, 'Order'>>
) {
	return await prisma.$transaction(async (tx) => {
		try {
			const newClientId = await getOrCreateClient(
				client.name,
				client.phone,
				tx as PrismaClient
			);

			if (newClientId === null) {
				return { success: false, msg: 'Ошибка при создании' };
			}

			const newOrder = await tx.order.create({
				data: {
					cl_type: order.cl_type,
					area_type: order.area_type,
					area: order.area,
					calc_sum: order.calc_sum,
					comment: order.comment,
					clientId: newClientId,
					isCall: order.isCall,
					location: order.location
				}
			});

			await tx.orderServices.createMany({
				data: services.map((s) => {
					return {
						name: s.name,
						orderId: newOrder.id
					};
				})
			});

			await tx.tgNotification.create({
				data: { orderId: newOrder.id, sent: false }
			});

			return { success: true, msg: '' };
		} catch (error) {
			console.log(error);
			return { success: false, msg: 'Ошибка при создании заявки' };
		}
	});
}

async function getOrCreateClient(
	name: string,
	phone: string,
	tx?: PrismaClient
): Promise<number | null> {
	try {
		const db = tx ?? prisma;

		const dbClient = await db.client.findFirst({ where: { phone } });

		if (dbClient) return dbClient.id;

		const newClient = await db.client.create({
			data: { name, phone }
		});

		return newClient.id;
	} catch (error) {
		logger.error({ title: 'getOrCreateClient', error });
		return null;
	}
}
