import {Component, signal} from '@angular/core';
import {Register} from "../register/register";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-login',
  imports: [
    Register,
    NgClass
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  isFormLogin = signal<boolean>(true);
  viewPassword: boolean = false;


  changeForm(){
    this.isFormLogin.update(state => !state);
  }

  changePassword(){
    this.viewPassword = !this.viewPassword;
  }

}
