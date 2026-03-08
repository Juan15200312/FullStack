import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CheckoutService} from "../../core/services/checkout/checkout-service";
import {UserService} from "../../core/services/user/user-service";
import {OrderSend} from "../../core/interfaces/checkout/orderSend";

@Component({
    selector: 'app-order-detail',
    imports: [],
    templateUrl: './order-detail.html',
    styleUrl: './order-detail.scss',
})
export class OrderDetail {
    private route = inject(ActivatedRoute);
    private checkoutService = inject(CheckoutService);
    private userService = inject(UserService);
    private orderDetail = signal<OrderSend|null>(null);

    ngOnInit() {
        const slug = this.route.snapshot.paramMap.get('slug');
        const email = this.route.snapshot.queryParamMap.get('email');

        const data:any = this.userService.user() ? {slug:slug} : {slug:slug,email:email};

        if (slug){
            this.checkoutService.searchOrder(data).subscribe({
                next: response => {
                    console.log(response)
                    //this.orderDetail.set(response);
                }, error: err => {
                    console.log(err);
                }
            })
        }

    }

}
