import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITodoItem } from 'app/shared/model/todo-item.model';
import { TodoItemService } from './todo-item.service';

@Component({
    selector: 'jhi-todo-item-update',
    templateUrl: './todo-item-update.component.html'
})
export class TodoItemUpdateComponent implements OnInit {
    todoItem: ITodoItem;
    isSaving: boolean;
    eventTime: string;

    constructor(private todoItemService: TodoItemService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ todoItem }) => {
            this.todoItem = todoItem;
            this.eventTime = this.todoItem.eventTime != null ? this.todoItem.eventTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.todoItem.eventTime = this.eventTime != null ? moment(this.eventTime, DATE_TIME_FORMAT) : null;
        if (this.todoItem.id !== undefined) {
            this.subscribeToSaveResponse(this.todoItemService.update(this.todoItem));
        } else {
            this.subscribeToSaveResponse(this.todoItemService.create(this.todoItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITodoItem>>) {
        result.subscribe((res: HttpResponse<ITodoItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
