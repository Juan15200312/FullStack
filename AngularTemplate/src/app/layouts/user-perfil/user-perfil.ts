import {Component, inject} from '@angular/core';
import {NgClass} from "@angular/common";
import {UserService} from "../../core/services/user/user-service";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-user-perfil',
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './user-perfil.html',
  styleUrl: './user-perfil.scss',
})
export class UserPerfil {
  protected userService = inject(UserService);
}
