import { Component } from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-register',
  imports: [
    NgClass
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  viewPassword: boolean = false;


  changePassword(){
    this.viewPassword = !this.viewPassword;
  }
}
