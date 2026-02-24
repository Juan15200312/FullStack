import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CheckoutService} from "../../services/checkout/checkout-service";
import {CartService} from "../../services/cart/cart-service";
import {AlertQuestionService} from "../../services/alerts-question/alert-question-service";

export const checkoutGuard: CanActivateFn = (route, state) => {

    const checkoutService = inject(CheckoutService)
    const cartService = inject(CartService)
    const alertQuestionService = inject(AlertQuestionService)
    const router = inject(Router);


    if (state.url.includes('/cart/shipping')){
        if (cartService.cart().length > 0){
            return true
        }
        alertQuestionService.notify(
            () => {
                alertQuestionService.close()
            },
            false,
            'Necesita tener al menos un producto en el carrito para poder acceder a esta seccion',
            '¡Acceso denegado!',
            'fa-solid fa-user-astronaut',
            'warning',
            'Aceptar',
        )
        router.navigate(['/dashboard'])
        return false
    }

    if (state.url.includes('/cart/payment')){
        if (checkoutService.shipping()){
            return true
        }

        alertQuestionService.notify(
            () => {
                alertQuestionService.close()
            },
            false,
            'Necesita rellenar el formulario de envio para poder acceder a esta seccion',
            '¡Acceso denegado!',
            'fa-solid fa-user-astronaut',
            'warning',
            'Aceptar',
        )
        router.navigate(['/cart/shipping'])
        return false
    }

    return true

};
