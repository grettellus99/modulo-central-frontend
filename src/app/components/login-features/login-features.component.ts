import { Component, OnInit } from '@angular/core';
import {LoginFeaturesService} from '../../shared/services/login-features.service';
import {interval} from 'rxjs';

@Component({
  selector: 'app-login-features',
  templateUrl: './login-features.component.html',
  styleUrls: ['./login-features.component.scss'],
})
export class LoginFeaturesComponent implements OnInit {

  //////////////////////////// Usuarios ////////////////////////////////

  // Suma de los usuarios conectados en la Red Nacional e Internet
  private userCountTotal: number;
  private userCountTotalNumber: number;

  // Cantidad maxima aproximada de usuarios
  private MaxUserCount = 300;

  ////////////////////////// Connections //////////////////////////////

  // Cantidad aproximada de conexiones
  private MaxConnectionCount = 9000;

  ////////////////////////// Internet //////////////////////////////////

  // Cantidad de conexiones Internet
  private connectionsCountInternet: number;
  private connectionsCountInternetNumber: number;

  //Kilobytes descargados Internet
  private bitesInternet: number;

  //Velocidad de conexion kbytes/s Internet
  private mbitesUsedInternet = 0;

  /////////////////////// Red Nacional ///////////////////////////////////

  //Cantidad de conexiones Red Nacional
  private connectionsCountNational: number;
  private connectionsCountNationalNumber: number;

  //Kilobytes descargados Red Nacional
  private bitesNational: number;

  //Velocidad de conexion kbytes/s Red National
  private mbitesUsedNational = 0;

  ///////////////////// Variables para el Form ///////////////////////

  //////////////////// ProgressBar ///////////////////////

  // Determina el modo de las progressBar
  private mode = 'indeterminate';

  // Determina el color de la progressBar de cantidad de usuarios
  private colorProgressBarUser = 'primary';

  // Determina el color de la progressBar de conexiones Internet
  private colorProgressBarInternet = 'primary';

  // Determina el color de la progressBar de conexiones Nacional
  private colorProgressBarNational = 'primary';

  constructor(private webinfo: LoginFeaturesService) {
  }

  ngOnInit() {

    ///////////////// Backend /////////////////////////

    // interval(2000).subscribe(x => {
    //   this.onGetUsersInfo();
    // });

    ///////////////// Test con Random ///////////////////

      if (!this.bitesNational) {
      this.randomFunction();
    }

      interval(6000).subscribe(x => {
        this.mode = 'determinate';
        this.randomFunction();
      });
  }

  ///////////////////////// Funcion Backend de obtencion de los datos //////////////////////////

  onGetUsersInfo() {
    this.webinfo.onGetWebInformation().subscribe((result: any) => {

      //////////////////// Usuarios /////////////////////////

      // Suma de usuarios I + RN
      this.userCountTotal = result.nationalInfo.userCount + result.internetInfo.userCount;
      this.userCountTotalNumber = this.userCountTotal;

      // Por ciento respecto a la cantidad maxima aproximada de usuarios
      this.userCountTotal = (this.userCountTotal * 100) / this.MaxUserCount;

      // Redondeo de por ciento a numero entero
      this.userCountTotal = Math.round(this.userCountTotal);

      ////////////////////////////// Conexion Internet //////////////////////////

      // Cantidad de conexiones Internet
      this.connectionsCountInternet = result.internetInfo.connectionCount;
      this.connectionsCountInternetNumber = this.connectionsCountInternet;

      // Por ciento respecto a la cantidad maxima aproximada de conexiones
      this.connectionsCountInternet = (this.connectionsCountInternet * 100) / this.MaxConnectionCount;

      // Redondeo de por ciento de conexiones Internet a numero entero
      this.connectionsCountInternet = Math.round(this.connectionsCountInternet);

      // bites descargados Internet
      this.bitesInternet = (result.internetInfo.bytes);

      // Cantidad de megabites ocupados de conexion Internet
      this.mbitesUsedInternet = this.bitesInternet / 1000000;

      // // Redondeo de velocidad Internet a dos lugares despues de la coma
      // this.mbitesUsedInternet = Math.round(this.mbitesUsedInternet * 100) / 100;

      ///////////////////////////// Conexion Red Nacional ////////////////////////////

      // // Cantidad de usuarios Red Nacional
      // this.usersCountInternet = result.nationalInfo.userCount;

      // Cantidad de conexiones Red Nacional
      this.connectionsCountNational = result.nationalInfo.connectionCount;
      this.connectionsCountNationalNumber = this.connectionsCountNational;

      // Por ciento respecto a la cantidad maxima aproximada de conexiones Red Nacional
      this.connectionsCountNational = (this.connectionsCountNational * 100) / this.MaxConnectionCount;

      // Redondeo de por ciento de conexiones Red Nacional a numero entero
      this.connectionsCountNational = Math.round(this.connectionsCountNational);

      // kbytes descargados Red Nacional
      this.bitesNational = result.nationalInfo.bytes;

      // Velocidad kbytes/s de conexion Red Nacional
      this.mbitesUsedNational = this.bitesNational / 1000000;

      // // Redondeo de velocidad Internet a dos lugares despues de la coma
      // this.kbytesSecondsNational = Math.round(this.kbytesSecondsNational * 100) / 100;

      ////////////////////// ProgressBars ///////////////
      // Cambio de modo progressBar
      this.mode = 'determinate';

      // Cambio color de progressBar Usuarios
      this.colorProgressBarUser = this.onColorProgressBar(this.userCountTotal);

      // Cambio color de progressBar conexiones Internet
      this.colorProgressBarInternet = this.onColorProgressBar(this.connectionsCountInternet);

      // Cambio color de progressBar conexiones Red Nacional
      this.colorProgressBarNational = this.onColorProgressBar(this.connectionsCountNational);
    });
}
randomFunction() {
 this.userCountTotal = Math.round((Math.round(Math.random() * 300 + 1)) * 100 / this.MaxUserCount);
 this.userCountTotalNumber = this.userCountTotal;
 this.connectionsCountInternet = Math.round((Math.round(Math.random() * this.MaxConnectionCount + 1))
   * 100 / this.MaxConnectionCount);
 this.connectionsCountInternetNumber = this.connectionsCountInternet;

 this.connectionsCountNational =  Math.round((Math.round(Math.random() * this.MaxConnectionCount + 1))
   * 100 / this.MaxConnectionCount);
 this.connectionsCountNationalNumber = this.connectionsCountNational;
 this.mbitesUsedInternet = (Math.round(Math.random() * 30 + 1) * 100) / 100;
 this.mbitesUsedNational = (Math.round(Math.random() * 70 + 1) * 100) / 100;

     //Cambio color de progressBar Usuarios
 this.colorProgressBarUser = this.onColorProgressBar(this.userCountTotal);

      // Cambio color de progressBar conexiones Internet
 this.colorProgressBarInternet = this.onColorProgressBar(this.connectionsCountInternet);

      // Cambio color de progressBar conexiones Red Nacional
 this.colorProgressBarNational = this.onColorProgressBar(this.connectionsCountNational);

  }

onColorProgressBar( n: number) {

    if ( n >= 70) {
     return 'warn';

    } else if (n < 70 && n >= 40) {
     return 'accent';

    } else {
      return 'primary';
    }
}
}
