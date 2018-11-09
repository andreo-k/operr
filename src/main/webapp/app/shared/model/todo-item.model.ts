import { Moment } from 'moment';

export interface ITodoItem {
    id?: number;
    eventTime?: Moment;
    todoTitle?: string;
    todoDesc?: string;
}

export class TodoItem implements ITodoItem {
    constructor(public id?: number, public eventTime?: Moment, public todoTitle?: string, public todoDesc?: string) {}
}
