import {Component, inject, output} from '@angular/core';
import {NgClass} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth/auth.service";
import {AlertService} from "../../../core/services/alerts/alert-service";
import {RegisterSend} from "../../../core/interfaces/auth/registerSend";
import {Router} from "@angular/router";

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
    onClose = output<void>()
    viewPassword: boolean = false;
    fb = inject(FormBuilder)
    private authService: AuthService = inject(AuthService);
    private alertService: AlertService = inject(AlertService);
    private router: Router = inject(Router);

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
            return alert('Formulario invalido')
        }

        const registerSend:RegisterSend = this.formRegister.value
        this.authService.register(registerSend).subscribe({
            next: response => {
                this.alertService.notify({type: 'success', icon: 'bi bi-check', title: '¡Enhorabuena!', message: response.message, color: 'success'})
                this.formRegister.reset()
                this.changePassword()
                this.router.navigate(['auth'])
                this.close()
            }, error: error => {
                console.log(error);
                const fullMessage = error.error.errors.join('\n');
                this.alertService.notify({type: 'danger', icon: 'bi bi-x', title: '¡Error!', message: fullMessage, color: 'danger'});
            }
        })
    }

    changePassword() {
        this.viewPassword = !this.viewPassword;
    }

    close(){
        this.onClose.emit();
    }
}
