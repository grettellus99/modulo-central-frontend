import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Entitlement} from '../../../shared/models/entitlement';
import {EntitlementService} from '../../../shared/services/entitlement.service';
import {EntitlementsDialogService} from '../entitlements-dialog.service';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-permisos',
  templateUrl: './entitlement.component.html',
  styleUrls: ['./entitlement.component.scss'],
})
export class EntitlementComponent implements OnInit {
  entitlements: Entitlement[];

  constructor(
    private entitlementService: EntitlementService,
    private dialogService: EntitlementsDialogService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.entitlementService.getTree().subscribe(entitlements => this.entitlements = entitlements);
  }

  edit(entitlement) {
    this.router.navigate(['/admin/permisos/form', entitlement.id]);
  }

  remove(entitlement: Entitlement) {
    this.dialogService
      .openRemoveDialog(entitlement)
      .afterClosed()
      .pipe(
        mergeMap(shoshouldDelete => {
          if (shoshouldDelete) {
            return this.entitlementService.delete(entitlement.id);
          }
          return of(undefined);
        }),
        mergeMap((result) => {
          if (result && result.id) {
            return this.entitlementService.getTree();
          }
          return of(undefined);
        }),
      )
      .subscribe(entitlements => this.entitlements = entitlements);
  }
}
