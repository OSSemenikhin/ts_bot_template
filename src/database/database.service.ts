import sqlite3 from 'sqlite3';
import { IDatabaseService } from './database.interface';
import { IConfigService } from '../config/config.interface';
import { ILoggerService } from '../logger/logger.interface';

export class DatabaseService implements IDatabaseService {
	private static instance: DatabaseService;
	private logger: ILoggerService;
	private database;

	constructor(configService: IConfigService, logger: ILoggerService) {
		this.database = new sqlite3.Database(configService.get('DB_NAME'));
		this.logger = logger;
		this.init();
	}

	public static getInstance(configService: IConfigService, logger: ILoggerService): IDatabaseService {
		if (DatabaseService.instance) {
			return DatabaseService.instance;
		}

		return DatabaseService.instance = new DatabaseService(configService, logger);
	}

	init(): void {
		this.database.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY)');
	}

	async checkRegistration(userID: number): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.database.get('SELECT id FROM users WHERE id = ?', [userID], (error, row) => {
				if (error) {
					this.logger.write(`DB: ${error.message}`, 'error');
					reject(error);
					return;
				}
				const user = row !== undefined;
				resolve(user);
			});
		});
	}

	addUser(userID: number): void {
		this.database.get('INSERT INTO users (id) VALUES(?)', [userID], (error) => {
			if (error) {
				this.logger.write(`DB: ${error.message}`, 'error');
				return;
			}
			this.logger.write(`DB: User ${userID} registered`, 'default');
			this.createUserChat(userID);
		});
	}

	removeUser(userID: number): void {
		this.database.get('DELETE FROM users WHERE id = ?', [userID], (error, row) => {
			if (error) {
				this.logger.write(`DB: ${error.message}`, 'error');
				return;
			}
			this.logger.write(`DB: User ${userID} deleted`, 'default');
			this.removeUserChat(userID);
		});
	}

	createUserChat(userID: number): void {
		this.database.get(`CREATE TABLE IF NOT EXISTS user_${userID} ( content TEXT NOT NULL, role TEXT NOT NULL)`, [], (error) => {
			if (error) {
				this.logger.write(`DB: ${error.message}`, 'error');
			}
		});
	}

	removeUserChat(userID: number): void {
		this.database.get(`DROP TABLE user_${userID}`, [], (error) => {
			if (error) {
				this.logger.write(`DB: ${error.message}`, 'error');
			}
		});
	}

	addMessage(userID: number): void {
		// Add a message to the chat for the user
	}

	getMessages(userID: number): void {
		// Get all messages for the chat of the user
	}
}


