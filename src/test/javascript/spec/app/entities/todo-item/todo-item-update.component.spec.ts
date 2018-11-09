/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { OperrTestModule } from '../../../test.module';
import { TodoItemUpdateComponent } from 'app/entities/todo-item/todo-item-update.component';
import { TodoItemService } from 'app/entities/todo-item/todo-item.service';
import { TodoItem } from 'app/shared/model/todo-item.model';

describe('Component Tests', () => {
    describe('TodoItem Management Update Component', () => {
        let comp: TodoItemUpdateComponent;
        let fixture: ComponentFixture<TodoItemUpdateComponent>;
        let service: TodoItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OperrTestModule],
                declarations: [TodoItemUpdateComponent]
            })
                .overrideTemplate(TodoItemUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TodoItemUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TodoItemService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TodoItem(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.todoItem = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TodoItem();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.todoItem = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
