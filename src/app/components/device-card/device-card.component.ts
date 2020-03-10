import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserDevice} from '../../core/user/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss'],
})
export class DeviceCardComponent implements OnInit {
  @Input() header: string;
  @Input() device: UserDevice;
  @Output() save: EventEmitter<UserDevice> = new EventEmitter();

  deviceType;
  deviceForm;

  ngOnInit() {
    const { name, mac, deviceType, isEnabled } = this.device;
    this.deviceForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      mac: new FormControl(mac, Validators.required),
      isEnabled: new FormControl(isEnabled, Validators.required),
    });
    this.deviceType = deviceType;
  }

  changeType(type) {
    this.deviceType = type;
  }

  getDeviceIndicatorClass(type) {
    return { 'device-card_content_type--selected': this.deviceType === type};
  }

  onSubmit() {
    if (this.deviceForm.valid) {
      this.save.emit({
        ...this.device,
        ...this.deviceForm.value,
        deviceType: this.deviceType,
      });
    }
  }

}
