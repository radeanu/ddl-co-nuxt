import { AppBot } from '@/common/types.js';

export default function (bot: AppBot) {
	bot.start((ctx) => {
		return ctx.reply(ctx.welcome, ctx.mainMenu);
	});
}
