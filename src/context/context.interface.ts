import { Context } from 'telegraf';
import { ILoggerService } from '../logger/logger.interface';
import { IDatabaseService } from '../database/database.interface';

export interface ISessionData {
	category: string;
}

export interface IBotContext extends Context {
	session: ISessionData;
	logger: ILoggerService;
	db: IDatabaseService;
}


