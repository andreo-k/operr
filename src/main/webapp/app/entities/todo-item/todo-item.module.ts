import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OperrSharedModule } from 'app/shared';
import {
    TodoItemComponent,
    TodoItemDetailComponent,
    TodoItemUpdateComponent,
    TodoItemDeletePopupComponent,
    TodoItemDeleteDialogComponent,
    todoItemRoute,
    todoItemPopupRoute
} from './';

const ENTITY_STATES = [...todoItemRoute, ...todoItemPopupRoute];

@NgModule({
    imports: [OperrSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TodoItemComponent,
        TodoItemDetailComponent,
        TodoItemUpdateComponent,
        TodoItemDeleteDialogComponent,
        TodoItemDeletePopupComponent
    ],
    entryComponents: [TodoItemComponent, TodoItemUpdateComponent, TodoItemDeleteDialogComponent, TodoItemDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperrTodoItemModule {}
