import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from './core/user/user.model';
import {AuthService} from './core/auth/auth.service';
import {AuthProviderService} from './core/auth/auth-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CentralModule';
  currentUser: User;
  isLoading = false;

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private authProvider: AuthProviderService,
    // private alertService: AlertService,
  ) {
    this.authProvider.subscribe(x => this.currentUser = x);
  }

  handleOnLogin(credentials) {
    this.isLoading = true;
    const { username, password } = credentials;
    this.authenticationService.login(username, password)
      .subscribe((user: User) => {
          this.authProvider.pushUser(user);
          this.router.navigate(['home'])
            .then(() => {
              this.isLoading = false;
            });
        },
        error => {
          this.isLoading = false;
        });
  }
}
