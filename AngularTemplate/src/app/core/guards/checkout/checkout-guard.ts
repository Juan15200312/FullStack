import {ActivatedRoute, CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {CheckoutService} from "../../services/checkout/checkout-service";

export const checkoutGuard: CanActivateFn = (route, state) => {

    const checkoutService = inject(CheckoutService)



    if (state.url.includes('/cart/shipping')){
        return (!!checkoutService.shipping())
    }

    if (state.url.includes('/cart/payment')){
        return (!!checkoutService.payment())
    }

    return state.url.includes('/cart');



};
