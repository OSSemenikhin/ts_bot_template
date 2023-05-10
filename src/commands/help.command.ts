import { Telegraf } from 'telegraf';
import { code } from 'telegraf/format';
import { Command } from './command.class';
import { IBotContext } from '../context/context.interface';

import { HELP_RESPONSE } from '../assets/responses';

export class HelpCommand extends Command {
	constructor(bot: Telegraf<IBotContext>) {
		super(bot);
	}

	handler(): void {
		this.bot.help((ctx) => {
			ctx.reply(code(HELP_RESPONSE));
		});
	}
}


