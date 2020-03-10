import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {BaseService} from './base.service';
import {Entitlement} from '../models/entitlement';
import {environment} from '../../../environments/environment';

const { apiUrl } = environment;

function normalizeEntitlementNode(ent) {
  const { _id, children, ...rest } = ent;
  const normalizedChildren = children ? children.map(item => normalizeEntitlementNode(item)) : undefined;
  return {
    id: _id,
    children: normalizedChildren,
    ...rest,
  };
}

function normalizeEntitlementTree(ents) {
  return ents.map(node => normalizeEntitlementNode(node));
}

@Injectable({
  providedIn: 'root',
})
export class EntitlementService extends BaseService<Entitlement> {
  constructor(
    private http: HttpClient,
  ) {
    super(http);
    this.entityName = 'entitlements';
  }

  getTree() {
    return this.http.get(`${apiUrl}/${this.entityName}/build/tree`).pipe(
      map(normalizeEntitlementTree),
    );
  }
}
