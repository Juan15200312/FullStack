import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthCookieService} from "../../services/cookies/auth-cookie.service";
import {AlertService} from "../../services/alerts/alert-service";

export const authGuard: CanActivateFn = (route, state) => {

    const cookieService = inject(AuthCookieService)
    const token = cookieService.get('token');
    const refreshToken = cookieService.get('refresh_token');
    const router = inject(Router);
    const alertService = inject(AlertService)

    if (token || refreshToken) {
        return true
    }

    alertService.notify({
        type: 'warning',
        icon: 'bi bi-exclamation',
        title: 'Sesión expirada',
        message: 'Debes iniciar sesión para acceder a esta sección.',
        color: 'warning'
    })
    router.navigate(['auth']);

    return false;
};
