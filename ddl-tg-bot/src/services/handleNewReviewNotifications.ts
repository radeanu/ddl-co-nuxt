import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';

import prisma from '@/prisma/prisma.js';
import { ALL_LOCATIONS } from '@/common/index.js';
import * as services from '@/services/index.js';

import { getReviewsNotSent } from '@/db/index.js';

export async function handleNewReviewNotifications() {
	const newReviews = await getReviewsNotSent();

	if (!newReviews.length) return;

	for await (const item of newReviews) {
		const locValue = ALL_LOCATIONS.find((l) => l.value === item.location);

		const messages = [
			`<b>🎁 Новый отзыв</b>\n`,
			`<b>Отзыв:</b> ${item.review ?? '-'}\n`,
			`🏆Оценка: ${item.rating} ⭐`,
			`📍Город: ${locValue?.name ?? ALL_LOCATIONS[0].name}`,
			`👤 ${item.name}`,
			`📆 ${item.createdAt.toLocaleString()}`
		]
			.filter(Boolean)
			.join('\n');

		const btns: InlineKeyboardMarkup = Markup.inlineKeyboard([
			Markup.button.callback('❌ Скрыть', `review|${item.id}|${0}`),
			Markup.button.callback('✅ Принять', `review|${item.id}|${1}`)
		]).reply_markup;

		await services.sendNotification(messages, btns);

		await prisma.review.update({ where: { id: item.id }, data: { sent: true } });
	}
}
