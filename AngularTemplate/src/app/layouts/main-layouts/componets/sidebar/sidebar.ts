import {Component, HostListener, inject, output} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../../../../core/services/user/user-service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-sidebar',
    imports: [
        RouterLink,
        RouterLinkActive,
        NgClass
    ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  onClose = output<void>();
  router = inject(Router);
  protected userService = inject(UserService);

  ngOnInit() {
    this.userService.synUser()
  }


  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    this.cancelar();
  }

  cancelar() {
    this.onClose.emit();
  }

}
