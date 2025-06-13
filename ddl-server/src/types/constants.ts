import { Markup } from 'telegraf';

import { type AppKeyboard } from '@/types/index.js';

export const START_KEYBOARDS: AppKeyboard[] = [];

const startKeyboard = Markup.keyboard(
	START_KEYBOARDS.map((item) => {
		return Markup.button.callback(item.label, item.callback);
	})
);
