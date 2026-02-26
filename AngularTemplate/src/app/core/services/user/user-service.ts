import {effect, inject, Injectable, signal} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserResponse} from "../../interfaces/user/userResponse";
import {SessionStorageService} from "../sessionStorage/session-storage.service";
import {AuthCookieService} from "../cookies/auth-cookie.service";
import {AuthService} from "../auth/auth.service";
import {AuthLocal} from "../localStorage/auth-local";
import {AlertQuestionService} from "../alerts-question/alert-question-service";
import {Router} from "@angular/router";
import {CheckoutService} from "../checkout/checkout-service";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private URL = environment.url;
    private http = inject(HttpClient)
    private sessionStorage = inject(SessionStorageService)
    private authCookie = inject(AuthCookieService)
    private authService = inject(AuthService)
    private localStorage = inject(AuthLocal)
    public user = signal<UserResponse | null>(this.loadUser());
    private alertQuestionService = inject(AlertQuestionService)
    private router = inject(Router)
    private checkoutService = inject(CheckoutService)

    private effectStorage = effect(() => {
        if (this.user()) {
            this.sessionStorage.set('user', JSON.stringify(this.user()));
        }
        if (!this.user() && this.authCookie.get('refresh_token')) {
            this.get().subscribe({
                next: response => {
                    this.user.set(response);
                }, error: error => {
                    console.error(error);
                }
            })
        }

    })

    public synUser() {
        if (!this.sessionStorage.get('user') && this.user()) {
            this.user.set(null)
        }
    }

    private loadUser() {
        if (this.sessionStorage.get('user')) {
            return JSON.parse(this.sessionStorage.get('user'))
        }
        return null
    }

    get() {
        return this.http.get<any>(`${this.URL}/user-info/`);
    }

    initialName(){
        if (this.user()) {
            return this.user()?.names.charAt(0).toUpperCase()
        }
        return '';
    }

    logout() {
        this.alertQuestionService.notify(
            () => {
                const refresh_token = this.authCookie.get('refresh_token');

                const clean = () => {
                    this.sessionStorage.removeAll()
                    this.authCookie.removeAll()
                    this.localStorage.removeAll()
                    this.checkoutService.clearCheckout()
                    this.user.set(null)
                }

                this.authService.logout(refresh_token).subscribe({
                    next: response => {
                        console.log(response)
                        clean()
                        this.alertQuestionService.notify(
                            () => {
                                this.alertQuestionService.close()
                            },
                            false,
                            '¡Se cerro con exito la sesion! Vuelva pronto',
                            'Sesion cerrada',
                            'fa-solid fa-hand-peace',
                            'success',
                            'Hecho',
                        )
                        this.router.navigate(['/dashboard']);
                    }, error: error => {
                        console.error(error);
                        clean()
                        this.router.navigate(['/dashboard']);
                    }
                })
            },
            true,
            '¿Estas seguro que deseas cerrar sesion?',
            'Cerrar Sesion',
            'fa-solid fa-right-from-bracket',
            'warning',
            'Cerrar Sesion',
            'Cancelar'
        )

    }

}
