import { ConfigService } from './config/config.service';
import { DatabaseService } from './database/database.service';
import { LoggerService } from './logger/logger.service';
import { Bot } from './bot';


const config = ConfigService.getInstance();
const logger = LoggerService.getInstance(config);
const database = DatabaseService.getInstance(config, logger);

const bot = new Bot(config, logger, database);


