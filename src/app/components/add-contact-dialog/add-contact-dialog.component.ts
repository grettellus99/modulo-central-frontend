import {Component, OnInit, ViewChild} from '@angular/core';
import {PhoneGuideService} from '../../shared/services/phone-guide.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
  styleUrls: ['./add-contact-dialog.component.css'],
})
export class AddContactDialogComponent implements OnInit {

  addForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  extNumbers: any = [];
  localNumbers: any = [];
  sendExtensions: string[] = [];
  sendLocalPhones: string[] = [];
  @ViewChild('extList') extList;
  @ViewChild('localPhoneList') localPhoneList;
  smartCounter = 0;
  constructor(private phoneService: PhoneGuideService, private form: FormBuilder) {}

  ngOnInit() {
    this.addForm = this.form.group({
      sector: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_ ]*$')]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_ ]*$')]],
      level: ['', Validators.pattern('^[a-zA-Z0-9_ ]*$')],
      extension: ['', [Validators.required, Validators.pattern('^\\d{4,4}(,\\d{4,4})*$')]],
      smartNumber: ['', Validators.pattern('^\\d{8,8}(,\\d{8,8})*$')],
      localphone: ['', Validators.pattern('^\\d{6,6}(,\\d{6,6})*$')],
      smartCheckBox: [''],

    });
  }

  save() {

    const contact = {
      sector: this.addForm.value.sector,
      name: this.addForm.value.name,
      smartphone: {
        level: this.addForm.value.level,
        number: this.addForm.value.smartNumber,
      },
      extension: this.sendExtensions,
      localphone: this.sendLocalPhones,
    };
    this.phoneService.saveContact(contact).subscribe();
  }

  addExtension(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.extNumbers.push({name: value.trim()});
      this.sendExtensions.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  addField() {
    this.smartCounter++;
  }

  removeExt(number: any): void {
    const index = this.extNumbers.indexOf(number);

    if (index >= 0) {
      this.extNumbers.splice(index, 1);
    }
  }

  addLocalPhone(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.localNumbers.push({name: value.trim()});
      this.sendLocalPhones.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeLP(number: any): void {
    const index = this.localNumbers.indexOf(number);

    if (index >= 0) {
      this.localNumbers.splice(index, 1);
    }
  }

  getSmartNumberErrors() {
    if (this.addForm.get('smartNumber').hasError('pattern')) {
      return 'Solo se admiten números separados por comas';
    }
    if (this.addForm.get('smartNumber').hasError('required')) {
      return 'No puede estar vacío el campo';
    }
  }

  getSectorErrors() {
    if (this.addForm.get('sector').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    if (this.addForm.get('sector').hasError('pattern')) {
      return  'Solo se permiten letras y números';
    }
  }

  getExtensionErrors() {
    if (this.addForm.get('extension').hasError('required')) {
      this.extList.errorState = true;
      return 'Este campo no puede estar vacío';
    } else {
      this.extList.errorState = false;
    }
    if (this.addForm.get('extension').hasError('pattern')) {
      this.extList.errorState = true;
      return 'Solo se admiten numeros de 4 dígitos a lo sumo';
    } else {
      this.extList.errorState = false;
    }
  }

  getNameErrors() {
    if (this.addForm.get('name').hasError('required')) {
      return 'Este campo no puede estar vacío';
    }
    if (this.addForm.get('name').hasError('pattern')) {
      return 'Solo se permiten letras y números'
    }
  }

  getLocalPhoneErrors() {
    if (this.addForm.get('localphone').hasError('pattern')) {
      this.localPhoneList.errorState = true;
      return 'Solo se permiten números de 6 dígitos';
    }  else {
      this.localPhoneList.errorState = false;
    }
  }

  getLevelErrors() {
    if (this.addForm.get('level').hasError('pattern')) {
      return 'Solo se permiten letras y números';
    }
  }
}


