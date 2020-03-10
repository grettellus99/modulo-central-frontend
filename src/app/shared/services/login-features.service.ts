import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class LoginFeaturesService {

  constructor(private http: HttpClient) {
  }

  onGetWebInformation() {
    return this.http.get(`${apiUrl}/connectionInfo/`);
}
}
