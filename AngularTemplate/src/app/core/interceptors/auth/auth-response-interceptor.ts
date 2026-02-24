import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, switchMap, throwError} from "rxjs";
import {inject} from "@angular/core";
import {AuthCookieService} from "../../services/cookies/auth-cookie.service";
import {SessionStorageService} from "../../services/sessionStorage/session-storage.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {AlertQuestionService} from "../../services/alerts-question/alert-question-service";

export const authResponseInterceptor: HttpInterceptorFn = (req, next) => {
    const cookieService = inject(AuthCookieService)
    const sessionStorageService = inject(SessionStorageService)
    const router = inject(Router);
    const alertQuestionService = inject(AlertQuestionService);
    const authService = inject(AuthService)

    return next(req).pipe(
        catchError(err => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
                if (req.url.includes('/token/refresh/')) {
                    cookieService.removeAll();
                    sessionStorageService.removeAll();

                    alertQuestionService.notify(
                        () => {
                            alertQuestionService.close()
                        },
                        false,
                        'Su sesion ha expirado, vuelva a iniciar sesion',
                        '¡Sesion expirada!',
                        'fa-solid fa-hourglass-end',
                        'danger',
                        'Entendido',
                    )

                    router.navigate(['/auth']);
                    return throwError(() => err);
                }


                const refresh_token = cookieService.get('refresh_token');

                if (!refresh_token) {
                    cookieService.removeAll()
                    sessionStorageService.removeAll()
                    alertQuestionService.notify(
                        () => {
                            alertQuestionService.close()
                        },
                        false,
                        'Su sesion ha expirado, vuelva a iniciar sesion',
                        '¡Sesion expirada!',
                        'fa-solid fa-hourglass-end',
                        'danger',
                        'Entendido',
                    )
                    router.navigate(['/auth']);
                    return throwError(() => err)
                }

                return authService.refreshToken(refresh_token).pipe(
                    switchMap((response) => {
                        const newToken = response.access
                        cookieService.set('token', newToken, 0.0208333333)
                        const clone = req.clone({
                            setHeaders: {
                                'Authorization': `Bearer ${newToken}`
                            },
                        })
                        return next(clone);
                    }), catchError(err => {
                        cookieService.removeAll()
                        sessionStorageService.removeAll()
                        alertQuestionService.notify(
                            () => {
                                alertQuestionService.close()
                            },
                            false,
                            'Su sesion ha expirado, vuelva a iniciar sesion',
                            '¡Sesion expirada!',
                            'fa-solid fa-hourglass-end',
                            'danger',
                            'Entendido',
                        )
                        router.navigate(['/auth']);
                        return throwError(() => err);
                    })
                )
            }
            return throwError(() => err);
        })
    );
};
