import {Component, inject, input, InputSignal, output} from '@angular/core';
import {CartService} from "../../../core/services/cart/cart-service";
import {FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-order-summary',
    imports: [],
    templateUrl: './order-summary.html',
    styleUrl: './order-summary.scss',
})
export class OrderSummary {
    protected cartService = inject(CartService);
    formPayment = input<FormGroup>();
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    onSubmitShipping = output<void>();
    onSubmitPayment = output<void>();

    verify() {
        this.route.data.subscribe((data) => {
            const url = data['url'];

            if (url === 'cart'){
                this.router.navigateByUrl('/cart/shipping');
            }else if(url === 'shipping'){
                this.onSubmitShipping.emit();
            }else if(url === 'payment'){
                this.onSubmitPayment.emit();
            }
        })
    }

}
