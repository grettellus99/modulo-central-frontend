import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {environment} from '../../../environments/environment';
import {User} from '../user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthProviderService {
  private currentUser: BehaviorSubject<User>;

  constructor(
  ) {
    const user = JSON.parse(sessionStorage.getItem(environment.SIGNED_USER_KEY)) as User || null;
    this.currentUser = new BehaviorSubject<User>(user);
  }

  getUser(): User {
    return this.currentUser.value;
  }

  subscribe(observable: (user: User) => void) {
    return this.currentUser.subscribe(observable);
  }

  pushUser(user: User) {
    sessionStorage.setItem(environment.SIGNED_USER_KEY, JSON.stringify(user));
    this.currentUser.next(user);
  }
}
