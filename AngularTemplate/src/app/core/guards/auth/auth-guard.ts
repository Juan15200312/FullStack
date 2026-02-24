import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthCookieService} from "../../services/cookies/auth-cookie.service";
import {AlertQuestionService} from "../../services/alerts-question/alert-question-service";

export const authGuard: CanActivateFn = (route, state) => {

    const cookieService = inject(AuthCookieService)
    const token = cookieService.get('token');
    const refreshToken = cookieService.get('refresh_token');
    const router = inject(Router);
    const alertQuestionService = inject(AlertQuestionService)

    if (token || refreshToken) {
        return true
    }

    alertQuestionService.notify(
        () => {
            alertQuestionService.close()
            router.navigate(['/auth'])
        },
        true,
        'Necesita iniciar sesion para acceder a esta sección',
        '¡Acceso denegado!',
        'fa-solid fa-user-lock',
        'warning',
        'Iniciar Sesion',
        'Cancelar',
    )

    return false;
};
