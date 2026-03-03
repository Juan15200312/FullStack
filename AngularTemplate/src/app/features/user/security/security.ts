import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {UserPassword} from "../../../core/interfaces/user/userPassword";
import {UserService} from "../../../core/services/user/user-service";
import {AlertQuestionService} from "../../../core/services/alerts-question/alert-question-service";

@Component({
    selector: 'app-security',
    imports: [
        ReactiveFormsModule,
        NgClass
    ],
    templateUrl: './security.html',
    styleUrl: './security.scss',
})
export class Security {
    viewPassword: boolean = false;
    private userService = inject(UserService);
    private fb = inject(FormBuilder)
    private alertQuestionService = inject(AlertQuestionService);
    protected formUserPassword = this.fb.group({
        currentPassword: ['', Validators.required],
        password1: ['', [Validators.required, Validators.minLength(8)]],
        password2: ['', [Validators.required, Validators.minLength(8)]],
    })

    isFieldInvalid(field: string): boolean {
        const control = this.formUserPassword.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }


    updatePassword(): void {
        if (this.formUserPassword.invalid){
            console.log('Formulario invalido')
            return;
        }
        const userPassword:UserPassword = this.formUserPassword.value as UserPassword;

        if (userPassword) {
            this.userService.updatePassword(userPassword).subscribe({
                next: response => {
                    console.log(response)
                    this.alertQuestionService.notify(
                        () => {
                            this.alertQuestionService.close()
                        },
                        false,
                        response.message,
                        '¡Listo!',
                        'fa-solid fa-hands-clapping',
                        'success',
                        'Aceptar',
                    )
                    this.formUserPassword.reset();
                }, error: error => {
                    console.log(error);
                    this.alertQuestionService.notify(
                        () => {
                            this.alertQuestionService.close()
                        },
                        false,
                        error.error,
                        '¡Error!',
                        'fa-solid fa-bomb',
                        'danger',
                        'Entendido',
                    )
                }
            })
        }
    }


    changePassword() {
        this.viewPassword = !this.viewPassword;
    }
}
