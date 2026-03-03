import {Component, inject, output} from '@angular/core';
import {NgClass} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth/auth.service";
import {RegisterSend} from "../../../core/interfaces/auth/registerSend";
import {Router} from "@angular/router";
import {AlertQuestionService} from "../../../core/services/alerts-question/alert-question-service";

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
    private router: Router = inject(Router);
    private alertQuestionService = inject(AlertQuestionService);


    formRegister: FormGroup = this.fb.group({
        names: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
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
                this.alertQuestionService.notify(
                    () => {
                        this.alertQuestionService.close()
                    },
                    false,
                    response.message,
                    '¡Enhorabuena!',
                    'fa-solid fa-user-check',
                    'success',
                    'Iniciar Sesion',
                )
                this.formRegister.reset()
                this.changePassword()
                this.close()
                this.router.navigate(['/auth'])
            }, error: error => {
                console.log(error);
                const fullMessage = error.error.errors[0];
                this.alertQuestionService.notify(
                    () => {
                        this.alertQuestionService.close()
                    },
                    false,
                    fullMessage,
                    '¡Ocurrio un error!',
                    'fa-solid fa-xmark',
                    'danger',
                    'Entendido',
                )
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
