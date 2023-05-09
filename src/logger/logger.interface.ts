type LogType = 'default' | 'error';

export interface ILoggerService {
	write(data: any|Array<any>, type?: LogType ): void;
}


