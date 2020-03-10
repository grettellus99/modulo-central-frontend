import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {EntitlementService} from '../../../shared/services/entitlement.service';
import {Entitlement} from '../../../shared/models/entitlement';

@Component({
  selector: 'app-entitlement-form',
  templateUrl: './entitlement-form.component.html',
  styleUrls: ['./entitlement-form.component.scss'],
})
export class EntitlementFormComponent implements OnInit {
  form: FormGroup;
  entitlementId: string;
  isActive: boolean;
  parent: Entitlement;
  entitlements: Entitlement[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private entitlementService: EntitlementService,
  ) { }

  ngOnInit() {
    this.entitlementService.findAll()
      .subscribe(entitlements => {
        this.entitlements = entitlements;
        this.activatedRoute.params.subscribe(params => {
          const { id } = params;
          if (id) {
            this.entitlementId = id;
            this.entitlementService.findOne(id)
              .subscribe(entitlement => {
                this.initForm(entitlement);
              });
          } else {
            this.initForm({
              name: '',
              code: '',
              order: 0,
              active: true,
            });
          }
        });
      });
  }

  initForm(entitlement: Entitlement) {
    const { name, code, order, parent, active } = entitlement;
    this.parent = this.entitlements.find(ent =>  ent && ent.id === parent);
    this.form = new FormGroup({
      name: new FormControl(name, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      code: new FormControl(code, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      order: new FormControl(order, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      parent: new FormControl(this.parent),
    });
    this.isActive = active;
  }

  filterEntitlements() {
    return this.entitlements.filter(item => item.id !== this.entitlementId);
  }

  saveEntitlement() {
    if (this.form.valid) {
      const { parent, ...rest } = this.form.value;
      const entitlement: Entitlement = {
        id: this.entitlementId,
        active: this.isActive,
        parent: parent ? parent.id : undefined,
        ...rest,
      };

      const subscription = this.entitlementId
        ? this.entitlementService.update(entitlement)
        : this.entitlementService.save(entitlement);

      subscription.subscribe(() => {
        this.router.navigate(['./admin/permisos']).then();
      });
    }
  }

}
