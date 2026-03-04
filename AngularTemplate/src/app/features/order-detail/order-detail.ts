import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CheckoutService} from "../../core/services/checkout/checkout-service";

@Component({
    selector: 'app-order-detail',
    imports: [],
    templateUrl: './order-detail.html',
    styleUrl: './order-detail.scss',
})
export class OrderDetail {
    private route = inject(ActivatedRoute);
    private checkoutService = inject(CheckoutService);

    ngOnInit() {
        const slug = this.route.snapshot.paramMap.get('slug');
        const email = this.route.snapshot.queryParamMap.get('email');

        if (slug && email) {
            this.checkoutService.searchOrder(slug, email).subscribe({
                next: response => {
                    console.log(response)
                }, error: err => {
                    console.log(err);
                }
            })

        }
    }

}
