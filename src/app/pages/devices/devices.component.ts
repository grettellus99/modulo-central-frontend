import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthProviderService} from '../../core/auth/auth-provider.service';
import {User} from '../../core/user/user.model';
import {UserService} from '../../core/user/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit, OnDestroy {
  user: User;
  subscription: Subscription;
  constructor(
    private authProvider: AuthProviderService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.subscription = this.authProvider.subscribe(user => {
      if (user) {
        const { devices, ...rest } = user;
        let userDevices = devices;
        if (devices.length < 3) {
          const refill = Array(3 - devices.length)
            .fill({
              name: '',
              mac: '',
              isEnabled: false,
              deviceType: 1,
            });
          userDevices = devices.concat(refill);
        }
        this.user = {
          ...rest,
          devices: userDevices,
        };
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateDevice(device) {
    this.userService.updateDevice(this.user.id, device)
      .subscribe(newUser => {
        this.authProvider.pushUser(newUser);
      });
  }

}
