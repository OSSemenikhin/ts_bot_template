import fs from 'fs';
import moment from 'moment';
import { ILoggerService } from './logger.interface';
import { IConfigService } from '../config/config.interface';
import { ConfigService } from '../config/config.service';

export class LoggerService implements ILoggerService {
	private static instance: LoggerService;
	protected readonly pathDefault: string;
	protected readonly pathErrors: string;

	constructor() {
		const config: IConfigService = ConfigService.getInstance();
		this.pathDefault = config.get('LOG_DEFAULT');
		this.pathErrors = config.get('LOG_ERRORS');
	}

	public static getInstance(): LoggerService {
		if (LoggerService.instance) {
			return LoggerService.instance;
		}

		return LoggerService.instance = new LoggerService();
	}

	public write(data: string|Array<string>, path = 'default'): void {
		const header = `===============${moment().format('DD.MM.YYYY HH:mm:ss')}===============`;
		const footer = '=================================================';
		const separator = '------------------------';

		let log = header + '\n';

		if (Array.isArray(data)) {
			data.forEach((item, index) => {
				log += JSON.stringify(item, null, 2) + '\n';
				if (data[index + 1]) log += separator + '\n';
			});
		} else {
			log += JSON.stringify(data, null, 2) + '\n';
		}

		log += footer + '\n';

		let file = this.pathDefault;
		switch(path) {
			case 'error':
				file = this.pathErrors;
				break;
		}

		fs.appendFileSync(file, log);
	}
}


