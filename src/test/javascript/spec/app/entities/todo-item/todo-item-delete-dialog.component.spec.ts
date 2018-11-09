/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OperrTestModule } from '../../../test.module';
import { TodoItemDeleteDialogComponent } from 'app/entities/todo-item/todo-item-delete-dialog.component';
import { TodoItemService } from 'app/entities/todo-item/todo-item.service';

describe('Component Tests', () => {
    describe('TodoItem Management Delete Component', () => {
        let comp: TodoItemDeleteDialogComponent;
        let fixture: ComponentFixture<TodoItemDeleteDialogComponent>;
        let service: TodoItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OperrTestModule],
                declarations: [TodoItemDeleteDialogComponent]
            })
                .overrideTemplate(TodoItemDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TodoItemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TodoItemService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
