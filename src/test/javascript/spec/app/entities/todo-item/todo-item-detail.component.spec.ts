/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OperrTestModule } from '../../../test.module';
import { TodoItemDetailComponent } from 'app/entities/todo-item/todo-item-detail.component';
import { TodoItem } from 'app/shared/model/todo-item.model';

describe('Component Tests', () => {
    describe('TodoItem Management Detail Component', () => {
        let comp: TodoItemDetailComponent;
        let fixture: ComponentFixture<TodoItemDetailComponent>;
        const route = ({ data: of({ todoItem: new TodoItem(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OperrTestModule],
                declarations: [TodoItemDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TodoItemDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TodoItemDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.todoItem).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
