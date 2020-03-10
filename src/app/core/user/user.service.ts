import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {normalizeUser, normalizeUsers, User, UserDevice} from './user.model';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  findAll(): Observable<User[]> {
    return this.http.get(`${apiUrl}/users`)
      .pipe(
        map(normalizeUsers),
      );
  }

  findByLogin(login): Observable<User> {
    return this.http.get(`${apiUrl}/users/find-by-login/${login}`)
      .pipe(
        map(normalizeUser),
      );
  }

  getById(id: string) {
    return this.http.get(`${apiUrl}/users/${id}`)
      .pipe(
        map(normalizeUser),
      );
  }

  register(user: User) {
    return this.http.post(`${apiUrl}/users/register`, { payload: user })
      .pipe(
        map(normalizeUser),
      );
  }

  changePhoto(image: File, userId: string): Observable<User> {
    const formData = new FormData();
    formData.append('image', image, `avatar ${userId}`);
    return this.http.put<User>(`${apiUrl}/users/upload/${userId}`, formData)
      .pipe(
        map(normalizeUser),
      );
  }

  update(user: User): Observable<User> {
    return this.http.put(`${apiUrl}/users/${user.id}`, user)
      .pipe(
        map(normalizeUser),
      );
  }

  updateDevice(userId: string, device: UserDevice) {
    return this.http.put(`${apiUrl}/users/${userId}/devices`, device)
      .pipe(
        map(normalizeUser),
      );
  }

  remove(user: User): Observable<string> {
    return this.http.delete<string>(`${apiUrl}/users/${user.id}`);
  }
}
