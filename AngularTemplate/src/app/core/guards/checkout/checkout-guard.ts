import {ActivatedRoute, CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CheckoutService} from "../../services/checkout/checkout-service";
import {CartService} from "../../services/cart/cart-service";
import {AlertService} from "../../services/alerts/alert-service";

export const checkoutGuard: CanActivateFn = (route, state) => {

    const checkoutService = inject(CheckoutService)
    const cartService = inject(CartService)
    const alertService = inject(AlertService)
    const router = inject(Router);


    if (state.url.includes('/cart/shipping')){
        if (cartService.cart().length > 0){
            return true
        }
        alertService.notify({
            type: 'warning',
            icon: 'fa-solid fa-user-astronaut',
            title: 'Acceso denegado',
            message: 'Necesita tener al menos un producto en el carrito para poder acceder a esta seccion',
            color: 'warning',
            guard: false
        })
        router.navigate(['/dashboard'])
        return false
    }

    if (state.url.includes('/cart/payment')){
        if (checkoutService.shipping()){
            return true
        }
        alertService.notify({
            type: 'warning',
            icon: 'fa-solid fa-user-astronaut',
            title: 'Acceso denegado',
            message: 'Necesita rellenar el formulario de envio para poder acceder a esta seccion',
            color: 'warning',
            guard: false
        })
        router.navigate(['/cart/shipping'])
        return false
    }

    return true

};
