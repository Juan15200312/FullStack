import {Component, HostListener, inject, output} from '@angular/core';
import {UserService} from "../../../../core/services/user/user-service";
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-user-popup',
  imports: [
    RouterLink,
    NgClass

  ],
  templateUrl: './user-popup.html',
  styleUrl: './user-popup.scss',
})
export class UserPopup {
  onClose = output<void>();
  protected userService = inject(UserService);

  @HostListener('document:keydown.escape')
  handleEscape() {
    this.close()
  }


  close() {
    this.onClose.emit();
  }
}
