import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITodoItem } from 'app/shared/model/todo-item.model';
import { TodoItemService } from './todo-item.service';

@Component({
    selector: 'jhi-todo-item-delete-dialog',
    templateUrl: './todo-item-delete-dialog.component.html'
})
export class TodoItemDeleteDialogComponent {
    todoItem: ITodoItem;

    constructor(private todoItemService: TodoItemService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.todoItemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'todoItemListModification',
                content: 'Deleted an todoItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-todo-item-delete-popup',
    template: ''
})
export class TodoItemDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ todoItem }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TodoItemDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.todoItem = todoItem;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
