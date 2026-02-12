import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthCookieService} from "../../services/cookies/auth-cookie.service";
import {SessionStorageService} from "../../services/sessionStorage/session-storage.service";

export const authSendInterceptor: HttpInterceptorFn = (req, next) => {
    const cookieService = inject(AuthCookieService)
    const token: string = cookieService.get('token');

    if (req.url.includes('/token/refresh/')) {
        return next(req);
    }


    let clone = req
    if (token) {
        clone = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(clone)
};
