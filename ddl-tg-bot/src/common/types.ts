import type { ReplyKeyboardMarkup } from 'telegraf/types';
import type { Context, Markup, Scenes, Telegraf } from 'telegraf';

export interface MySceneSession extends Scenes.SceneSessionData {
	removeLastCallback?: boolean;
}

export interface MyContext extends Context {
	welcome: string;
	mainMenu?: Markup.Markup<ReplyKeyboardMarkup>;
	scene: Scenes.SceneContextScene<MyContext, MySceneSession>;
}

export type AppBot = Telegraf<MyContext>;
export type AppScene = Scenes.BaseScene<MyContext>;

export type CommandHandler = (bot: AppBot) => void;
