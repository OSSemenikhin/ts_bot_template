import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';

import {
	UNREGISTERED_RESPONSE,
	REGISTERED_RESPONSE,
	SUCCESS_REGISTERATION_RESPONSE
} from '../assets/responses';

export class Auth {
	constructor(public bot: Telegraf<IBotContext>) {
		this.init();
	}

	init(): void {
		this.registration();
		this.checkRegistration();
	}

	checkRegistration(): void {
		this.bot.on('message', async (ctx, next) => {
			const userID: number = Number(ctx.from.id);
			const registered: boolean|undefined = await this.bot.context?.db?.checkRegistration(userID);
			if (registered) return await next();
			else ctx.reply(UNREGISTERED_RESPONSE);
		});
	}

	registration(): void {
		this.bot.hears('ya ne odin iz vas', async (ctx, next) => {
			const userID: number = Number(ctx.from.id);
			const registered: boolean|undefined = await this.bot.context?.db?.checkRegistration(userID);
			if (registered) {
				ctx.reply(REGISTERED_RESPONSE);
			}
			this.bot.context?.db?.addUser(ctx.from.id);
			ctx.reply(SUCCESS_REGISTERATION_RESPONSE);
		});
	}
}


