import { Telegraf } from 'telegraf';

import { env } from '@/config/index.js';
import type { MyContext, AppBot } from '@/common/types.js';

let bot: AppBot | null = null;

export function useTgBot() {
	if (!bot) {
		bot = new Telegraf<MyContext>(env.BOT_TOKEN);
	}

	return bot;
}
