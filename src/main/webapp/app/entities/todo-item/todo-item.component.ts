import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import * as _ from 'lodash';

import { ITodoItem } from 'app/shared/model/todo-item.model';
import { Principal } from 'app/core';
import { TodoItemService } from './todo-item.service';
import { TodoItemDeleteDialogComponent } from 'app/entities/todo-item/todo-item-delete-dialog.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-todo-item',
    templateUrl: './todo-item.component.html'
})
export class TodoItemComponent implements OnInit, OnDestroy {
    todoItems: ITodoItem[];
    selection: ITodoItem[] = [];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private todoItemService: TodoItemService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private modalService: NgbModal
    ) {}

    loadAll() {
        this.todoItemService.query().subscribe(
            (res: HttpResponse<ITodoItem[]>) => {
                this.todoItems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTodoItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITodoItem) {
        return item.id;
    }

    selectionChanged(item: ITodoItem) {
        if (this.isSelected(item)) {
            _.pull(this.selection, item);
        } else {
            this.selection.push(item);
        }
    }

    isSelected(item: ITodoItem): boolean {
        return _.indexOf(this.selection, item) !== -1;
    }

    selectionEmpty(): boolean {
        return _.isEmpty(this.selection);
    }

    deleteSelection() {
        setTimeout(() => {
            const ngbModalRef = this.modalService.open(TodoItemDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });

            ngbModalRef.result
                .then(result => {
                    this.todoItemService.deleteMultiple(this.selection).subscribe(response => {
                        this.eventManager.broadcast({
                            name: 'todoItemListModification',
                            content: 'Deleted selected todoItems'
                        });
                    });
                })
                .catch(() => {});
        }, 0);
    }

    registerChangeInTodoItems() {
        this.eventSubscriber = this.eventManager.subscribe('todoItemListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
