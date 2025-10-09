import { ALL_LOCATIONS } from '@/common/index.js';
import * as services from '@/services/index.js';

import {
	getNewNotifications,
	type Notification,
	updateNotification
} from '@/db/index.js';

function renderCallMessage(item: Notification) {
	const locValue = ALL_LOCATIONS.find((l) => l.value === item.Order.location);

	return [
		`<b>⭐ Заявка на звонок, № ${item.orderId}</b>\n`,
		`<b>Комментарий:</b> ${item.Order.comment?.length ? item.Order.comment : '-'}\n`,
		`📍Город: ${locValue?.name ?? 'Не указан'}`,
		`🔧 Вид услуги: ${item.Order.service_type}`,
		`👤 ${item.Order.Client.name}`,
		`☎️ ${item.Order.Client.phone}`,
		`📆 ${item.Order.createdAt.toLocaleString()}`
	]
		.filter(Boolean)
		.join('\n');
}

function renderOrderMessage(item: Notification) {
	const locValue = ALL_LOCATIONS.find((l) => l.value === item.Order.location);

	return [
		`<b>⭐ Новая заявка, № ${item.orderId}</b>\n`,
		`<b>Вид уборки:</b> ${item.Order.cl_type}`,
		`<b>Тип помещения:</b> ${item.Order.area_type}`,
		`<b>Метраж:</b> ${item.Order.area}`,
		item.Order.OrderServices.length
			? `<b>Дополнительные услуги:</b> ${item.Order.OrderServices.map((s) => s.name).join(', ')}`
			: false,
		`<b>Комментарий:</b> ${item.Order.comment ?? '-'}\n`,
		`📍Город: ${locValue?.name ?? ALL_LOCATIONS[0].name}`,
		`💲 ${item.Order.calc_sum} ₽`,
		`👤 ${item.Order.Client.name}`,
		`☎️ ${item.Order.Client.phone}`,
		`📆 ${item.Order.createdAt.toLocaleString()}`
	]
		.filter(Boolean)
		.join('\n');
}

export async function handleNewNotifications() {
	const newNotifications = await getNewNotifications();

	if (!newNotifications.length) return;

	for await (const item of newNotifications) {
		const messages = item.Order.isCall
			? renderCallMessage(item)
			: renderOrderMessage(item);

		const res = await services.sendNotification(messages);
		const log = res.success ? '' : res.msg;

		await updateNotification(item.id, res.success, log);
	}
}
