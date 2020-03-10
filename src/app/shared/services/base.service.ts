import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const { apiUrl } = environment;

function normalizeEntity(entity) {
  const { _id, ...rest } = entity;
  return {
    ...rest,
    id: _id,
  };
}

function normalizeEntities(entities) {
  return entities.map(normalizeEntity);
}

@Injectable({
  providedIn: 'root',
})
export class BaseService<Entity> {
  entityName = '';
  constructor(
    private baseHttpClient: HttpClient,
  ) { }

  findAll(): Observable<Entity[]> {
    return this.baseHttpClient.get<Entity[]>(`${apiUrl}/${this.entityName}`)
      .pipe(
        map(normalizeEntities),
      );
  }

  findOne(id: string): Observable<Entity> {
    return this.baseHttpClient.get<Entity>(`${apiUrl}/${this.entityName}/${id}`)
      .pipe(
        map(normalizeEntity),
      );
  }

  save<T>(entity: T): Observable<T> {
    return this.baseHttpClient.post<T>(`${apiUrl}/${this.entityName}`, entity)
      .pipe(
        map(normalizeEntity),
      );
  }

  update(entity: Entity): Observable<Entity> {
    // @ts-ignore
    return this.baseHttpClient.put(`${apiUrl}/${this.entityName}/${entity.id}`, entity)
      .pipe(
        map(normalizeEntity),
      );
  }

  delete(id: string): Observable<string> {
    return this.baseHttpClient.delete<string>(`${apiUrl}/${this.entityName}/${id}`);
  }
}
