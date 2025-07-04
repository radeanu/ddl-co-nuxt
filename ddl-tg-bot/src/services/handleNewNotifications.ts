import { LOCATIONS } from '@/common/index.js';
import * as services from '@/services/index.js';

import { getNewNotifications, updateNotification } from '@/db/index.js';

export async function handleNewNotifications() {
	const newNotifications = await getNewNotifications();

	if (!newNotifications.length) return;

	for await (const item of newNotifications) {
		const locValue = LOCATIONS.find((l) => l.value === item.Order.location);

		const messages = [
			`<b>⭐ Новая заявка, № ${item.orderId}</b>\n`,
			`<b>Вид уборки:</b> ${item.Order.cl_type}`,
			`<b>Тип помещения:</b> ${item.Order.area_type}`,
			`<b>Метраж:</b> ${item.Order.area}`,
			item.Order.OrderServices.length
				? `<b>Дополнительные услуги:</b> ${item.Order.OrderServices.map((s) => s.name).join(', ')}`
				: false,
			`<b>Комментарий:</b> ${item.Order.comment ?? '-'}\n`,
			`📍Город: ${locValue?.name ?? LOCATIONS[0].name}`,
			`💲 ${item.Order.calc_sum} ₽`,
			`👤 ${item.Order.Client.name}`,
			`☎️ ${item.Order.Client.phone}`,
			`📆 ${item.Order.createdAt.toLocaleString()}`
		]
			.filter(Boolean)
			.join('\n');

		const res = await services.sendNotification(messages);
		const log = res.success ? '' : res.msg;

		await updateNotification(item.id, res.success, log);
	}
}
