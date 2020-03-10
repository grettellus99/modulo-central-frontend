import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, timer, Subscription} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Cuota} from '../models/cuota';
import {AuthProviderService} from '../../core/auth/auth-provider.service';

@Injectable({ providedIn: 'root' })
export class CuotaService {

  private percent;
  private timer: Subscription;
  private user: Cuota;
  private dataObservable: BehaviorSubject<any>;
  private apiUrl = `${environment.cuotaApiUrl}/users`;
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient,
    private authService: AuthProviderService,
  ) {
    this.dataObservable = new BehaviorSubject(null);
  }


  private handleError(error: any) {
    // todo: falta un verdadero manejo del error
    console.error('An error occurred', error);
    if (error.statusText === 'Unknown Error') {
      error.message = 'Servidor inaccesible, revise su conexión.';
    }
    this.timer.unsubscribe();
  }

  getData(): Observable<any> {
    return new Observable(subscriber => {
      this.timer = timer(0, 60000).subscribe(() => {
        const user = this.authService.getUser();
        this.http.post(this.apiUrl, user, {headers: this.headers})
          .toPromise()
          .then((data: Cuota) => {
            this.user = { ...data };
            this.percent = +((this.user.usage / this.user.max) * 100).toFixed(2);
            subscriber.next({
              porcent: this.percent,
              usuario: this.user
            });
          })
          .catch(this.handleError);
      });
    });
  }

  stopDataFetching() {
    if (this.timer) {
      this.timer.unsubscribe();
    }
  }
}
