import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {interval, Observer, Subject} from 'rxjs';
import {LoginFeaturesService} from '../../shared/services/login-features.service';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
})
export class GaugeComponent implements OnInit {
  @Input() public valueGauge;

  constructor( public webinfo: LoginFeaturesService) {
  }
  ngOnInit() {
  }

  onColorPrimary(): string {
    return 'teal';
  }
  onColorAccent(): string {
    return 'darkorange';
  }
  onColorWarn(): string {
    return 'firebrick';
  }

  // onColor(num: number) {
  //   return (value) => {
  //       if (num  >= 200) {
  //         return 'teal';
  //       } else if (num < 200 && num >= 100) {
  //         return 'gold';
  //       } else {
  //         return 'firebrick';
  //       }
  //   };
  // }

  onVelocity(val: number): (value: number) => string {
    return (value) => {return val + ' Kb/s'};
  }
}
