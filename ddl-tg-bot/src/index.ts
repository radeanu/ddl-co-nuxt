import cron from 'node-cron';
import { callbackQuery, message } from 'telegraf/filters';
import { Markup, Scenes, session } from 'telegraf';

import commands from '@/commands/index.js';
import { useTgBot } from '@/config.bot.js';
import { logger } from '@/config/index.js';
import * as services from '@/services/index.js';
import { LABELS, MENU_COMMANDS } from '@/common/index.js';
import type { CommandHandler, MyContext } from '@/common/types.js';

const bot = useTgBot();

const taskRunner = cron.createTask('* * * * * *', services.handleNewNotifications, {
	noOverlap: true
});

const taskReviewRunner = cron.createTask(
	'* * * * * *',
	services.handleNewReviewNotifications,
	{
		noOverlap: true
	}
);

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

	bot.on(callbackQuery('data'), async (ctx, next) => {
		try {
			const [name, ...args] = ctx.callbackQuery.data.split('|');

			if (name !== 'review') return next();

			const reviewId = +args[0];
			const valid = +args[1];

			const res = await services.handleReviewValidation(reviewId, Boolean(valid));

			if (!res.success) {
				return ctx.reply(res.msg);
			}

			const text = valid ? '✅ Отзыв принят' : '❌ Отзыв не принят';

			return ctx.editMessageReplyMarkup(
				Markup.inlineKeyboard([Markup.button.url(text, 'https://ddl-99.ru')])
					.reply_markup
			);
		} catch (error) {
			logger.error({
				title: 'callbackQuery: review',
				data: ctx.callbackQuery.data
			});
			return ctx.reply(LABELS.error);
		}
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

	await taskReviewRunner.stop();
	await taskReviewRunner.destroy();
}

await bootstrap().then(async () => {
	await taskRunner.start();
	await taskReviewRunner.start();
});

process.once('SIGINT', async () => await handleShutdown('SIGINT'));
process.once('SIGTERM', async () => await handleShutdown('SIGTERM'));
