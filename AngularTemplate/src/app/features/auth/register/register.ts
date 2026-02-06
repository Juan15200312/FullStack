import {Component, inject} from '@angular/core';
import {NgClass} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  imports: [
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  viewPassword: boolean = false;
  fb = inject(FormBuilder)

  formRegister: FormGroup = this.fb.group({
    names: ['', Validators.required],
    email: ['', Validators.required],
    password1: ['', [Validators.required, Validators.minLength(8)]],
    password2: ['', [Validators.required, Validators.minLength(8)]],
  })

  isFieldInvalid(field: string): boolean {
    const control = this.formRegister.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  register() {
    if (this.formRegister.invalid) {
      console.log('No valido')
    }else {
      console.log('Usuario registrado')
    }
  }

  changePassword(){
    this.viewPassword = !this.viewPassword;
  }
}
