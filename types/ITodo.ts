export enum TodoStatus {
	Pending = 'pending',
	InProgress = 'inProgress',
	Done = 'done'
}

export interface ITodoData {
	title: string;
	desc: string;
	sub: string;
	status: TodoStatus;
}

export interface ITodo {
	id: string;
	data: ITodoData;
}

export interface ITodoCreateEntry extends ITodoData {

}