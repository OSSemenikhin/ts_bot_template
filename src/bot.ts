import { Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';

import { IBotContext } from './context/context.interface';

import{ IAuthService } from './auth/auth.interface';
import{ AuthService } from './auth/auth.class';

import { LoggerService } from './logger/logger.service';
import { ILoggerService } from './logger/logger.interface';

import { IDatabaseService } from './database/database.interface';
import { DatabaseService } from './database/database.service';

import { IConfigService } from './config/config.interface';
import { ConfigService } from './config/config.service';

import { Command} from './commands/command.class';
import { StartCommand } from './commands/start.command';
import { RemoveUserCommand } from './commands/removeUser.command';
import { HelpCommand } from './commands/help.command';

import { HiCommand } from './commands/hi.command';

export class Bot {
	bot: Telegraf<IBotContext>;
	commands: Command[] = [];
	auth: IAuthService;

	constructor() {
		const config: IConfigService = ConfigService.getInstance();
		const logger: ILoggerService = LoggerService.getInstance();
		const database: IDatabaseService = DatabaseService.getInstance();

		this.bot = new Telegraf<IBotContext>(config.get('TOKEN_TELEGRAM'));
		this.bot.use(new LocalSession({ database: "sessions.json" })).middleware();
		this.bot.context.logger = logger;
		this.bot.context.db = database;

		this.auth = new AuthService(this.bot);

		this.init();
	}

	init() {
		this.auth.init();
		this.commands = [
			new StartCommand(this.bot),
			new HelpCommand(this.bot),
			new RemoveUserCommand(this.bot),
			new HiCommand(this.bot),
		];
		for( const command of this.commands ) {
			command.handler();
		}
		this.bot.launch();
	}
}


