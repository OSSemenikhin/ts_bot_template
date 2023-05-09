export interface IDatabaseService {
	init(): void;
	checkRegistration(userID: number): Promise<boolean>;
	addUser(userID: number): void;
	removeUser(userID: number): void;
	createUserChat(userID: number): void;
	removeUserChat(userID: number): void;
	addMessage(userID: number, message: string): void;
	getMessages(userID: number): void;
}


