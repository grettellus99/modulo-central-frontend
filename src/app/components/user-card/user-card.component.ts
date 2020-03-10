import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {User} from '../../core/user/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() user: User;
  @Input() avatarSize: 'small' | 'medium' | 'large' = 'large';
  @Output() avatarClick: EventEmitter<Event> = new EventEmitter();

  onAvatarClick(event) {
    this.avatarClick.next(event);
  }

}
