import { Moment } from 'moment';

export interface ITodoItem {
    id?: number;
    eventTime?: Moment;
    todoTitle?: string;
    todoDesc?: string;
    selected?: boolean;
}

export class TodoItem implements ITodoItem {
    constructor(
        public id?: number,
        public eventTime?: Moment,
        public todoTitle?: string,
        public todoDesc?: string,
        public selected?: boolean
    ) {}
}
