import { Context, Markup, Telegraf } from 'telegraf';
import { ReplyKeyboardMarkup } from 'telegraf/types';

export type AppKeyboard = {
	label: string;
	callback: string;
};

interface SessionData {
	messageCount: number;
}

export interface MyContext extends Context {
	mainMenu?: Markup.Markup<ReplyKeyboardMarkup>;
	session?: SessionData;
}

export type AppBot = Telegraf<MyContext>;

export type CommandHandler = (bot: AppBot) => void;
