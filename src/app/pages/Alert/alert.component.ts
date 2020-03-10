import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {AlertService} from '../../shared/services/alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html'

})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;
    classObject;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => {
            this.message = message;
            this.classObject = {
              'alert': message,
              'alert-success': message.type === 'success',
              'alert-danger': message.type === 'error',
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
