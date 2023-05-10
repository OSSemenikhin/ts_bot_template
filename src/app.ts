import fs from 'fs';
import { ConfigService } from './config/config.service';
import { DatabaseService } from './database/database.service';
import { LoggerService } from './logger/logger.service';
import { Bot } from './bot';


const config = ConfigService.getInstance();

if (!fs.existsSync(config.get('LOG_DIR'))) {
	fs.mkdirSync(config.get('LOG_DIR'));
}


const logger = LoggerService.getInstance(config);
const database = DatabaseService.getInstance(config, logger);

const bot = new Bot(config, logger, database);


