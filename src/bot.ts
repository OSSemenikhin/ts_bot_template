import { Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';

import { IBotContext } from './context/context.interface';
import { IConfigService } from './config/config.interface';
import { IDatabaseService } from './database/database.interface';
import { ILoggerService } from './logger/logger.interface';

import{ IAuthService } from './auth/auth.interface';
import{ AuthService } from './auth/auth.class';

import { Command} from './commands/command.class';
import { StartCommand } from './commands/start.command';
import { RemoveUserCommand } from './commands/removeUser.command';
import { HelpCommand } from './commands/help.command';

import { HiCommand } from './commands/hi.command';

export class Bot {
	bot: Telegraf<IBotContext>;
	commands: Command[] = [];
	auth: IAuthService;

	private readonly configService: IConfigService;

	constructor(
		configService: IConfigService,
		logger: ILoggerService,
		database: IDatabaseService,
	) {
		this.configService = configService;
		this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN_TELEGRAM'));
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


