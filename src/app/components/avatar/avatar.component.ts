import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() photoUrl: string;
  @Input() size: 'small' | 'medium' | 'large' = 'small';
  @Input() color: 'primary' | 'accent' = 'accent';
  avatarStyle;

  constructor() { }

  ngOnInit() {
    switch (this.size) {
      case 'small':
        this.avatarStyle = {
          height: '32px',
          width: '32px',
        };
        break;
      case 'medium':
        this.avatarStyle = {
          height: '42px',
          width: '42px',
        };
        break;
      case 'large':
        this.avatarStyle = {
          height: '52px',
          width: '52px',
        };
    }
  }

  getSource() {
    return this.photoUrl || `../../../assets/images/user-icon-${this.color}.svg`;
  }

}
