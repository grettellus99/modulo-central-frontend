import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

import {CuotaService} from '../../shared/services/cuota.service';
import {AuthProviderService} from '../../core/auth/auth-provider.service';
import {User} from '../../core/user/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: User;
  cuotaData: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cuotaService: CuotaService,
    private authProviderService: AuthProviderService,
  ) {}

  ngOnInit(): void {
    // this.cuotaService.getData().subscribe(data => {
    //   const {porcent, usuario: {max, usage, today, lastWeek}} = data;
    //   this.cuotaData = {
    //     consumido: porcent,
    //     usado: usage,
    //     total: max,
    //     hoy: today,
    //     semana: lastWeek
    //   };
    // });
    this.authProviderService.subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    // this.cuotaService.stopDataFetching();
  }

  assignColor(consumido: number) {
    if (consumido >= 50 && consumido < 80) {
      return 'accent';
    }
    if (consumido >= 80) {
      return 'warn';
    }
    return 'primary';
  }

  prettyBytes(bytes) {
    const units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
    const aux = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, Math.floor(aux))).toFixed(1) +  ' ' + units[aux];
  }

}
