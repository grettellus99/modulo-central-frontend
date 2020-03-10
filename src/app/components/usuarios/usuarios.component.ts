import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user/user.service';


export interface Usuarios {
  status: string;
  account: string;
}
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  constructor(private users: UserService) {
    this.USER_DATA = [];
   }

  USER_DATA: Usuarios[];
  dataSource;
  displayedColumns: string[] = ['account', 'status'];

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    // todo: REVISAR
    this.users.findAll().subscribe(users => {
      this.USER_DATA = users.map(element => ({ account: element.name, status:'' }));
      this.dataSource = this.USER_DATA;
    });

  }
}
