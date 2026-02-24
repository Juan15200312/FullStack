import {Component, inject, signal} from '@angular/core';
import {Register} from "../register/register";
import {NgClass} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginSend} from "../../../core/interfaces/auth/loginSend";
import {AuthService} from "../../../core/services/auth/auth.service";
import {AuthCookieService} from "../../../core/services/cookies/auth-cookie.service";
import {LoginResponse} from "../../../core/interfaces/auth/loginResponse";
import {Router} from "@angular/router";
import {UserService} from "../../../core/services/user/user-service";
import {AlertQuestionService} from "../../../core/services/alerts-question/alert-question-service";

@Component({
    selector: 'app-login',
    imports: [
        Register,
        NgClass,
        ReactiveFormsModule,
    ],
    templateUrl: './login.html',
    styleUrl: './login.scss',
})
export class Login {
    fb = inject(FormBuilder)
    isFormLogin = signal<boolean>(true);
    viewPassword: boolean = false;
    private authService: AuthService = inject(AuthService);
    private cookieService:AuthCookieService = inject(AuthCookieService);
    private alertQuestionService = inject(AlertQuestionService);
    private router= inject(Router);
    private userService = inject(UserService);

    formLogin: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
    })

    isFieldInvalid(field: string): boolean {
        const control = this.formLogin.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    login() {
        if (this.formLogin.invalid) {
            return alert('Formulario invalido')
        }

        const loginSend:LoginSend = this.formLogin.value;

        this.authService.login(loginSend).subscribe({
            next: response => {
                const datos:LoginResponse = response;
                const {access_token, refresh_token, user} = datos.data;

                this.cookieService.set('refresh_token', refresh_token, 1)
                this.cookieService.set('token', access_token, 0.0208333)
                this.userService.user.set(datos.data.user)

                this.alertQuestionService.notify(
                    () => {
                        this.alertQuestionService.close()
                    },
                    false,
                    `Bienvenido otra vez ${user.names.split(' ').at(0)} a BookLy`,
                    '¡Bienvenido!',
                    'fa-solid fa-champagne-glasses',
                    'success',
                    'Hecho',
                )
                this.formLogin.reset()
                this.router.navigate(['/dashboard'])
            }, error: error => {
                let message:string = 'Ha ocurrido un error inesperado.';
                if (error.status === 0) {
                    message = 'No se pudo conectar con el servidor. Verifica que esté encendido o tu conexión a internet';
                }else if (error.status >= 500) {
                    message = 'Error interno del servidor. Intentelo mas tarde';
                }else if (error.error) {
                    message = error.error.errors.join('\n');
                }

                this.alertQuestionService.notify(
                    () => {
                        this.alertQuestionService.close()
                    },
                    false,
                    message,
                    '¡Ocurrio un error!',
                    'fa-solid fa-xmark',
                    'danger',
                    'Entendido',
                )
            }
        })

    }

    changeForm() {
        this.isFormLogin.update(state => !state);
    }

    changePassword() {
        this.viewPassword = !this.viewPassword;
    }

}
