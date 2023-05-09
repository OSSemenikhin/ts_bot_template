import { Command } from './command.class';
import { IBotContext } from '../context/context.interface';
import { Telegraf } from 'telegraf';

import { HELP_RESPONSE } from '../assets/responses';

export class HelpCommand extends Command {
	constructor(bot: Telegraf<IBotContext>) {
		super(bot);
	}

	handler(): void {
		this.bot.help((ctx) => {
			ctx.reply(HELP_RESPONSE);
		});
	}
}


