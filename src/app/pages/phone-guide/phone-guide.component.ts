import {Component, OnInit, ViewChild} from '@angular/core';
import {PhoneGuideService} from '../../shared/services/phone-guide.service';
import {Contact} from '../../shared/models/contact';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {AddContactDialogComponent} from '../../components/add-contact-dialog/add-contact-dialog.component';
import {DeleteContactDialogComponent} from '../../components/delete-contact-dialog/delete-contact-dialog.component';
import {DetailsDialogComponent} from '../../components/details-dialog/details-dialog.component';

@Component({
  selector: 'app-phone-guide',
  templateUrl: './phone-guide.component.html',
  styleUrls: ['./phone-guide.component.css'],
})
export class PhoneGuideComponent implements OnInit {

  contactList: Contact[];
  dataSource: any;
  displayedColumns: string[] = ['sector', 'name', 'extension', 'localphone', 'actions'];

  @ViewChild( MatPaginator ) paginator: MatPaginator;

  constructor(private phoneService: PhoneGuideService, public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.phoneService.getAll().subscribe((result: Contact[]) => {
      this.contactList = result;
      this.dataSource = new MatTableDataSource<Contact>(this.contactList);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddContactDialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getList();
    });
  }
  openDeleteDialog(item) {
    const dialogRef = this.dialog.open(DeleteContactDialogComponent, {
      data: item,
    });
    dialogRef.afterClosed().subscribe((validation) => {
       if (validation) { this.getList(); }
    });
  }
  openDetailsDialog(item) {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      data: item,
    });
  }
}
