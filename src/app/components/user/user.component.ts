import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../../core/user/user.model';
import {UserService} from '../../core/user/user.service';
import {AuthService} from '../../core/auth/auth.service';
import {AuthProviderService} from '../../core/auth/auth-provider.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  account: User;

  constructor(
    private authProvider: AuthProviderService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authProvider.subscribe(user => {
      this.account = user;
    });
  }

  logout() {
    this.authService.logout();
    this.authProvider.pushUser(null);
    this.router.navigateByUrl('');
  }

  onImagePicked(event) {
    const image = event.target.files[0];
    if (image) {
      this.userService
        .changePhoto(image, this.account.id)
        .subscribe(user => {
          this.authProvider.pushUser(user);
        });
    }
  }
}
