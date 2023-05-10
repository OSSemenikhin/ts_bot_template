import fs from 'fs';
import { Bot } from './bot';
import { ConfigService } from './config/config.service';

const config = ConfigService.getInstance();

if (!fs.existsSync(config.get('LOG_DIR'))) {
	fs.mkdirSync(config.get('LOG_DIR'));
}

const bot = new Bot();


