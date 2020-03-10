import {Component, OnInit} from '@angular/core';
import {Rol} from '../../../shared/models/rol';
import {EntitlementService} from '../../../shared/services/entitlement.service';
import {Entitlement} from '../../../shared/models/entitlement';
import {RolesService} from '../../../shared/services/roles.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss'],
})
export class RolesFormComponent implements OnInit {
  rol: Rol;
  entitlements: Entitlement[];

  constructor(
    private entitlementService: EntitlementService,
    private rolesService: RolesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.entitlementService.getTree()
      .subscribe(entitlements => this.entitlements = entitlements);
    this.activatedRoute.params
      .subscribe(params => {
        const { id } = params;
        if (id) {
          this.rolesService.findOne(id)
            .subscribe(rol => this.rol = rol);
        }
        this.rol = {
          name: '',
          active: true,
          entitlements: [],
        };
      });
  }

  updateEntitlements(entitlements) {
    this.rol.entitlements = entitlements;
  }

  isValid() {
    return this.rol && this.rol.name && this.rol.active;
  }

  guardar() {
    if (this.isValid()) {
      const action = this.rol.id ? this.rolesService.save : this.rolesService.update;
      action(this.rol)
        .subscribe(() => {
          this.router.navigateByUrl('admin/roles');
        });
    }
  }

}
