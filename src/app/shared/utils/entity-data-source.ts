import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

/**
 * Data source for the Permisos view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EntityDataSource<Entity> extends DataSource<Entity> {
  stream: Subject<Entity[]>;
  data: Entity[];

  constructor(data) {
    super();
    this.data = data;
    this.stream = new BehaviorSubject<Entity[]>(data);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Entity[]> {
    return this.stream;
  }

  push(entity) {
    this.data.push(entity);
    this.stream.next(this.data);
  }

  update(entity: Entity) {
    // @ts-ignore
    const pIndex = this.data.findIndex(d => d.id === entity.id);
    this.data[pIndex] = entity;
    this.stream.next(this.data);
  }

  remove(id) {
    // @ts-ignore
    this.data = this.data.filter(d => d.id !== id);
    this.stream.next(this.data);
  }

  // tslint:disable-next-line:no-empty
  disconnect() {}

}
