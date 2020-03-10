import {Component, Inject, OnInit} from '@angular/core';
import {PhoneGuideService} from '../../shared/services/phone-guide.service';
import {Contact} from '../../shared/models/contact';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss'],
})
export class DetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public phoneService: PhoneGuideService) { }

  currentContact: Contact;
  displayedColumns: string[] = ['smartphone', 'level'];



  ngOnInit() {
    this.currentContact = this.data;
    console.log(this.currentContact);
  }


}
