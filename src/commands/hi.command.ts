import { Command } from './command.class';
import { IBotContext } from '../context/context.interface';
import { Telegraf } from 'telegraf';

export class HiCommand extends Command {
	constructor(bot: Telegraf<IBotContext>) {
		super(bot);
	}

	handler(): void {
		this.bot.hears('hi', (ctx) => {
			ctx.reply('asdfasdfasdf');
			this.bot.context?.logger?.write(ctx.message);
		});
	}
}


