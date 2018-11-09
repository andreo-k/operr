import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITodoItem } from 'app/shared/model/todo-item.model';

@Component({
    selector: 'jhi-todo-item-detail',
    templateUrl: './todo-item-detail.component.html'
})
export class TodoItemDetailComponent implements OnInit {
    todoItem: ITodoItem;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ todoItem }) => {
            this.todoItem = todoItem;
        });
    }

    previousState() {
        window.history.back();
    }
}
