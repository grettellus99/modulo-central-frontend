import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PhoneGuideService} from '../../shared/services/phone-guide.service';

@Component({
  selector: 'app-delete-contact-dialog',
  templateUrl: './delete-contact-dialog.component.html',
  styleUrls: ['./delete-contact-dialog.component.scss'],
})
export class DeleteContactDialogComponent implements OnInit {

  contactData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private phoneService: PhoneGuideService,
  ) {}

  ngOnInit(): void {
    this.contactData = this.data;
  }

  delete() {
    this.phoneService.deleteContact(this.contactData._id).subscribe();
  }

}
