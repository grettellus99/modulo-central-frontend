import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {normalizeUser} from '../user/user.model';

const { apiUrl } = environment;

function handleSignResponse(res) {
  const { token, refreshToken, refreshTokenExpiresAt, user } = res;
  const signedUser = normalizeUser(user);
  sessionStorage.setItem(environment.AUTHENTICATION_TOKEN_KEY, token);
  return signedUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) { }

  login(smAccountName: string, password: string) {
    return this.http.post<any>(`${apiUrl}/login`, { smAccountName, password })
      .pipe(
        map(res => handleSignResponse(res)),
      );
  }

  logout() {
    sessionStorage.removeItem(environment.AUTHENTICATION_TOKEN_KEY);
  }
}
