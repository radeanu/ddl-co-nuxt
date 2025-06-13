import { message } from 'telegraf/filters';
import { Markup, Scenes, Telegraf, session } from 'telegraf';

// import commands from '@/commands/index.js';
import { env, logger } from '@/config/index.js';
import type { CommandHandler, MyContext } from '@/common/types.js';
import { LABELS, MENU_COMMANDS, MAIN_KEYBOARDS } from '@/common/index.js';

const bot = new Telegraf<MyContext>(env.BOT_TOKEN);

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

	// commands.forEach((commandHandler: CommandHandler) => {
	// 	commandHandler(bot);
	// });

	// bot.on(message('sticker'), async (ctx) => {
	// 	return bot.telegram.deleteMessage(ctx.from.id, ctx.message.message_id);
	// });

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

await bootstrap();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
