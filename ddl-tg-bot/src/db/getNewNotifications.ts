import prisma from '@/prisma/prisma.js';
import {
	CLEANING_TYPES,
	PLACE_TYPES,
	OTHER_SERVICES,
	SERVICE_LIST
} from '@/common/index.js';

export type Notification = Awaited<ReturnType<typeof getNewNotifications>>[number];

export async function getNewNotifications() {
	const list = await prisma.tgNotification.findMany({
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

	return list.map((item) => {
		const cl_type =
			CLEANING_TYPES.find((c) => c.value === item.Order.cl_type)?.name ?? '-';
		const area_type =
			PLACE_TYPES.find((c) => c.value === item.Order.area_type)?.name ?? '-';

		const service_type =
			SERVICE_LIST.find((s) => s.value === item.Order.service_type)?.name ?? '-';

		const services = item.Order.OrderServices.map((s) => {
			const s_name = OTHER_SERVICES.find((it) => it.value === s.name)?.name ?? '-';

			return {
				...s,
				name: s_name
			};
		});

		const order = {
			...item.Order,
			cl_type,
			area_type,
			service_type,
			OrderServices: services
		};

		return {
			...item,
			Order: order
		};
	});
}
