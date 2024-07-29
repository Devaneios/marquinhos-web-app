import { Component, inject, OnInit } from '@angular/core';
import { BaseCardComponent } from '../base-card/base-card.component';
import { UserService } from '../../core/services/user.service';
import { AsyncPipe } from '@angular/common';
import { User } from '../../core/types/user.interface';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  standalone: true,
  imports: [BaseCardComponent, AsyncPipe],
})
export class ProfileCardComponent implements OnInit {
  avatarUrl = 'https://cdn.discordapp.com/embed/avatars/0.png';

  private readonly _userService = inject(UserService);

  constructor() {}

  ngOnInit() {
    this._userService.userObservable.subscribe((user: User | null) => {
      if (!user) return;

      if (user.avatar && user.id) {
        this.avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
      } else if (user.id) {
        this.avatarUrl = `https://cdn.discordapp.com/embed/avatars/${(BigInt(user.id) >> 22n) % 6n}.png`;
      }
    });
  }

  get user() {
    return this._userService.userObservable;
  }
}
