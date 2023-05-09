import { Command } from './command.class';
import { IBotContext } from '../context/context.interface';
import { Telegraf } from 'telegraf';

import { START_RESPONSE } from '../assets/responses';

export class StartCommand extends Command {
	constructor(bot: Telegraf<IBotContext>) {
		super(bot);
	}

	handler(): void {
		this.bot.start((ctx) => {
			ctx.reply(START_RESPONSE);
			this.bot.context?.logger?.write(ctx.message);
		});
	}
}


