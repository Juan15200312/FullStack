import {Component, inject, output} from '@angular/core';
import {UserService} from "../../../../core/services/user/user-service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-user-popup',
  imports: [
    RouterLink
  ],
  templateUrl: './user-popup.html',
  styleUrl: './user-popup.scss',
})
export class UserPopup {
  onClose = output<void>();
  protected userService = inject(UserService);


  close() {
    this.onClose.emit();
  }
}
