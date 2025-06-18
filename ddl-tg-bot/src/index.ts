import cron from 'node-cron';
import { message } from 'telegraf/filters';
import { Scenes, Telegraf, session } from 'telegraf';

import commands from '@/commands/index.js';
import { env, logger } from '@/config/index.js';
import type { CommandHandler, MyContext } from '@/common/types.js';
import { LABELS, MENU_COMMANDS, waitFor } from '@/common/index.js';

import { getNewNotifications, updateNotification } from '@/db/index.js';

const bot = new Telegraf<MyContext>(env.BOT_TOKEN);
const taskRunner = cron.createTask('* * * * * *', handleNewNotifications, {
	noOverlap: true
});

async function sendNotification(message: string) {
	try {
		const tg_ids = env.ADMIN_TG_ID.split(',');

		await Promise.allSettled(
			tg_ids.map(async (chatId) => {
				try {
					await bot.telegram.sendMessage(chatId, message, {
						parse_mode: 'HTML'
					});
					return;
				} catch (e) {
					logger.error({
						title: 'sendNotification: sendMessage',
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

async function handleNewNotifications() {
	const newNotifications = await getNewNotifications();

	if (!newNotifications.length) return;

	for await (const item of newNotifications) {
		const messages = [
			`<b>⭐ Новая заявка, № ${item.orderId}\n</b>`,
			`<b>Вид уборки:</b> ${item.Order.cl_type}`,
			`<b>Тип помещения:</b> ${item.Order.area_type}`,
			`<b>Метраж:</b> ${item.Order.area}`,
			item.Order.OrderServices.length
				? `<b>Дополнительные услуги:</b> ${item.Order.OrderServices.map((s) => s.name).join(', ')}`
				: false,
			`💲 ${item.Order.calc_sum} ₽`,
			`👤 ${item.Order.Client.name}`,
			`☎️ ${item.Order.Client.phone}`,
			`📆 ${item.Order.createdAt.toLocaleString()}`
		]
			.filter(Boolean)
			.join('\n');

		const res = await sendNotification(messages);
		const log = res.success ? '' : res.msg;

		await updateNotification(item.id, res.success, log);
	}
}

async function bootstrap() {
	bot.context.welcome = [LABELS.welcome].join('\n\n');
	// bot.context.mainMenu = Markup.keyboard(
	// 	Object.values(MAIN_KEYBOARDS).map((item) => [item.label])
	// )
	// 	.resize()
	// 	.oneTime();

	const stage = new Scenes.Stage<MyContext>([]);

	bot.use(session());
	bot.use(stage.middleware());

	bot.telegram.setMyCommands(Object.values(MENU_COMMANDS).map((item) => item));

	commands.forEach((commandHandler: CommandHandler) => {
		commandHandler(bot);
	});

	bot.on(message('text'), async (ctx, next) => {
		return next();
	});

	bot.catch((error) => {
		logger.error({ title: 'BOT error', error });
	});

	bot.launch(async () => {
		console.log('🚀 Bot started');
	});
}

async function handleShutdown(reason: string) {
	bot.stop(reason);
	await taskRunner.stop();
	await taskRunner.destroy();
}

await bootstrap().then(async () => {
	await taskRunner.start();
});

process.once('SIGINT', async () => await handleShutdown('SIGINT'));
process.once('SIGTERM', async () => await handleShutdown('SIGTERM'));
