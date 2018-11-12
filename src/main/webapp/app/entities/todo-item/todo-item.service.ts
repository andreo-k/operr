import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITodoItem } from 'app/shared/model/todo-item.model';
import * as _ from 'lodash';

type EntityResponseType = HttpResponse<ITodoItem>;
type EntityArrayResponseType = HttpResponse<ITodoItem[]>;

@Injectable({ providedIn: 'root' })
export class TodoItemService {
    public resourceUrl = SERVER_API_URL + 'api/todo-items';

    constructor(private http: HttpClient) {}

    create(todoItem: ITodoItem): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(todoItem);
        return this.http
            .post<ITodoItem>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(todoItem: ITodoItem): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(todoItem);
        return this.http
            .put<ITodoItem>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITodoItem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITodoItem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    deleteMultiple(items: ITodoItem[]): Observable<HttpResponse<any>> {
        console.log('Yo!');
        const ids = _.map(items, 'id');
        return this.http.post<number[]>(`${this.resourceUrl}/delete-multiple`, ids, { observe: 'response' });
    }

    protected convertDateFromClient(todoItem: ITodoItem): ITodoItem {
        const copy: ITodoItem = Object.assign({}, todoItem, {
            eventTime: todoItem.eventTime != null && todoItem.eventTime.isValid() ? todoItem.eventTime.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.eventTime = res.body.eventTime != null ? moment(res.body.eventTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((todoItem: ITodoItem) => {
                todoItem.eventTime = todoItem.eventTime != null ? moment(todoItem.eventTime) : null;
            });
        }
        return res;
    }
}
