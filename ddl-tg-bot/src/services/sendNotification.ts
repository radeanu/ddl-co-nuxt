import { InlineKeyboardMarkup } from 'telegraf/types';

import { useTgBot } from '@/config.bot.js';
import { waitFor } from '@/common/index.js';
import { env, logger } from '@/config/index.js';

const bot = useTgBot();

export async function sendNotification(message: string, btns?: InlineKeyboardMarkup) {
	try {
		const tg_ids = env.ADMIN_TG_ID.split(',');

		await Promise.allSettled(
			tg_ids.map(async (chatId) => {
				try {
					await bot.telegram.sendMessage(chatId, message, {
						parse_mode: 'HTML',
						reply_markup: btns
					});
					return;
				} catch (e) {
					logger.error({
						title: 'sendNotification: sendMessage',
						chatId,
						error: e
					});
					return;
				}
			})
		);

		await waitFor(1000);
		return { success: true, msg: '' };
	} catch (error) {
		logger.error({ title: 'sendNotification', error });
		return { success: false, msg: 'Error' };
	}
}
