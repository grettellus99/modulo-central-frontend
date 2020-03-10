// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-gauge-pro',
//   templateUrl: './gauge-pro.component.html',
//   styleUrls: ['./gauge-pro.component.scss'],
// })
// export class GaugeProComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }
import {NgModule, Component, enableProdMode, Input} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxCircularGaugeModule } from 'devextreme-angular';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-gauge-pro',
  templateUrl: './gauge-pro.component.html',
  styleUrls: ['./gauge-pro.component.scss'],
})
export class GaugeProComponent {
  @Input() public valueGauge;
  @Input() public gaugeTypeInternet: boolean;
}

@NgModule({
  imports: [
    BrowserModule,
    DxCircularGaugeModule,
  ],
  declarations: [GaugeProComponent],
  bootstrap: [GaugeProComponent],
  exports: [
    GaugeProComponent,
  ],

})
export class GaugeProModule { }

platformBrowserDynamic().bootstrapModule(GaugeProModule);
