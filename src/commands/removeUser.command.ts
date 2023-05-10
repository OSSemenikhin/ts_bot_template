import { Command } from './command.class';
import { IBotContext } from '../context/context.interface';
import { Telegraf } from 'telegraf';

import { REMOVE_USER_RESPONSE } from '../assets/responses';

export class RemoveUserCommand extends Command {
	constructor(bot: Telegraf<IBotContext>) {
		super(bot);
	}

	handler(): void {
		this.bot.hears('..rmme', async (ctx) => {
			this.bot.context?.db?.removeUser(ctx.from.id);
			ctx.reply(REMOVE_USER_RESPONSE)
		});
	}
}


