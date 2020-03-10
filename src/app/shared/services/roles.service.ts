import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Rol} from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolesService extends BaseService<Rol> {

  constructor(
    private http: HttpClient,
  ) {
    super(http);
    this.entityName = 'roles';
  }
}
