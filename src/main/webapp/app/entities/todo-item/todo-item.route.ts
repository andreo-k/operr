import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TodoItem } from 'app/shared/model/todo-item.model';
import { TodoItemService } from './todo-item.service';
import { TodoItemComponent } from './todo-item.component';
import { TodoItemDetailComponent } from './todo-item-detail.component';
import { TodoItemUpdateComponent } from './todo-item-update.component';
import { TodoItemDeletePopupComponent } from './todo-item-delete-dialog.component';
import { ITodoItem } from 'app/shared/model/todo-item.model';

@Injectable({ providedIn: 'root' })
export class TodoItemResolve implements Resolve<ITodoItem> {
    constructor(private service: TodoItemService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TodoItem> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TodoItem>) => response.ok),
                map((todoItem: HttpResponse<TodoItem>) => todoItem.body)
            );
        }
        return of(new TodoItem());
    }
}

export const todoItemRoute: Routes = [
    {
        path: 'todo-item',
        component: TodoItemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TodoItems'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'todo-item/:id/view',
        component: TodoItemDetailComponent,
        resolve: {
            todoItem: TodoItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TodoItems'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'todo-item/new',
        component: TodoItemUpdateComponent,
        resolve: {
            todoItem: TodoItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TodoItems'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'todo-item/:id/edit',
        component: TodoItemUpdateComponent,
        resolve: {
            todoItem: TodoItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TodoItems'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const todoItemPopupRoute: Routes = [
    {
        path: 'todo-item/:id/delete',
        component: TodoItemDeletePopupComponent,
        resolve: {
            todoItem: TodoItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TodoItems'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
