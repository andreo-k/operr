/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OperrTestModule } from '../../../test.module';
import { TodoItemComponent } from 'app/entities/todo-item/todo-item.component';
import { TodoItemService } from 'app/entities/todo-item/todo-item.service';
import { TodoItem } from 'app/shared/model/todo-item.model';

describe('Component Tests', () => {
    describe('TodoItem Management Component', () => {
        let comp: TodoItemComponent;
        let fixture: ComponentFixture<TodoItemComponent>;
        let service: TodoItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OperrTestModule],
                declarations: [TodoItemComponent],
                providers: []
            })
                .overrideTemplate(TodoItemComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TodoItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TodoItemService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TodoItem(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.todoItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
