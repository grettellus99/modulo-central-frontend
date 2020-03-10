import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../environments/environment';
import {BaseService} from './base.service';

const { apiUrl } = environment;

@Injectable({providedIn: 'root'})
export class PhoneGuideService {

  constructor(private http: HttpClient) {}


  getAll() {
    return this.http.get(`${apiUrl}/contacts/`);
  }
  saveContact(contact) {
    return this.http.post(`${apiUrl}/contacts/`, contact);
  }
  deleteContact(id) {
    return this.http.delete(`${apiUrl}/contacts/${id}`);
  }
}
