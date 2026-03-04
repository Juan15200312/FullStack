import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthCookieService} from "../../services/cookies/auth-cookie.service";
import {AuthService} from "../../services/auth/auth.service";
import {catchError, switchMap} from "rxjs";

export const authSendInterceptor: HttpInterceptorFn = (req, next) => {
    const cookieService = inject(AuthCookieService)
    const authService = inject(AuthService)
    const token: string | null = cookieService.get('token');

    if (req.url.includes('/token/refresh/') || req.url.includes('/token/verify/')) {
        return next(req);
    }

    let clone = req

    if (token) {
        clone = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(clone)
    }

    const refreshToken = cookieService.get('refresh_token');
    if (refreshToken) {
        return authService.refreshToken(refreshToken).pipe(
            switchMap(response => {
                const newToken = response.access;
                cookieService.set('token', newToken, 0.0208333333);
                const clone = req.clone({
                    setHeaders: { Authorization: `Bearer ${newToken}` }
                });
                return next(clone);
            }),
            catchError(() => next(req))
        );
    }

    return next(req);
};
