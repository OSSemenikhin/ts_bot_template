import { Telegraf } from 'telegraf';
import { code } from 'telegraf/format';
import { IAuthService } from './auth.interface';
import { IBotContext } from '../context/context.interface';

import {
	UNREGISTERED_RESPONSE,
	REGISTERED_RESPONSE,
	SUCCESS_REGISTERATION_RESPONSE,
	HELP_RESPONSE,
	HELP_INFO,
} from '../assets/responses';

export class AuthService implements IAuthService {
	constructor(public bot: Telegraf<IBotContext>) {}

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
			await ctx.reply(SUCCESS_REGISTERATION_RESPONSE);
			await ctx.reply(code(HELP_INFO));
			await ctx.reply(code(HELP_RESPONSE));
		});
	}
}



