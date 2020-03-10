import {AfterViewInit, Component, Input, NgZone, OnInit} from '@angular/core';

// import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
//
// am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-speedbar',
  templateUrl: './speedbar.component.html',
  styleUrls: ['./speedbar.component.scss'
  ]
})
export class SpeedbarComponent implements OnInit, AfterViewInit {

  // private chart: am4charts.GaugeChart;
  @Input() idname: string;
  @Input() max = 75;


  constructor(private zone: NgZone) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.zone.runOutsideAngular(() => {
    //   const chart = am4core.create(this.idname, am4charts.GaugeChart);
    //
    //   chart.innerRadius = am4core.percent(82);
    //
    //   /**
    //    * Normal axis
    //    */
    //
    //   const axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    //   axis.min = 0;
    //   axis.max = this.max;
    //   axis.strictMinMax = true;
    //   axis.renderer.radius = am4core.percent(90);
    //   axis.renderer.inside = false;
    //   axis.renderer.line.strokeOpacity = 1;
    //   axis.renderer.ticks.template.strokeOpacity = 1;
    //   axis.renderer.ticks.template.length = 50;
    //   axis.renderer.grid.template.disabled = true;
    //
    // /**
    //  * Axis for ranges
    //  */
    //
    //   const colorSet = new am4core.ColorSet();
    //
    //   const axis2 = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    //   axis2.min = 0;
    //   axis2.max = this.max;
    //   axis2.renderer.innerRadius = 20;
    //   axis2.strictMinMax = true;
    //   axis2.renderer.labels.template.disabled = true;
    //   axis2.renderer.ticks.template.disabled = true;
    //   axis2.renderer.grid.template.disabled = true;
    //
    //   const range0 = axis2.axisRanges.create();
    //   range0.value = 0;
    //   range0.endValue = 50;
    //   range0.axisFill.fillOpacity = 1;
    //   range0.axisFill.fill = colorSet.getIndex(0);
    //
    //   const range1 = axis2.axisRanges.create();
    //   range1.value = 50;
    //   range1.endValue = 100;
    //   range1.axisFill.fillOpacity = 1;
    //   range1.axisFill.fill = colorSet.getIndex(2);
    //
    //   /**
    //    * Label
    //    */
    //
    //   const label = chart.radarContainer.createChild(am4core.Label);
    //   label.isMeasured = false;
    //   label.fontSize = 20;
    //   label.x = am4core.percent(50);
    //   label.y = am4core.percent(100);
    //   label.horizontalCenter = 'middle';
    //   label.verticalCenter = 'bottom';
    //   label.text = '10%';
    //
    //   /**
    //    * Hand
    //    */
    //
    //   const hand = chart.hands.push(new am4charts.ClockHand());
    //   hand.axis = axis2;
    //   hand.innerRadius = am4core.percent(20);
    //   hand.startWidth = 10;
    //   hand.pin.disabled = true;
    //   hand.value = 50;
    //
    //   hand.events.on('propertychanged', (ev) => {
    //     range0.endValue = ev.target.value;
    //     range1.value = ev.target.value;
    //     axis2.invalidate();
    //   });
    //
    //   setInterval(() => {
    //     const value = Math.round(Math.random() * 100);
    //     label.text = value + '%';
    //     const animation = new am4core.Animation(hand, {
    //       property: 'value',
    //       to: value
    //     }, 1000, am4core.ease.cubicOut).start();
    //   }, 2000);
    //
    //   this.chart = chart;
    //
    // });
  }
}
