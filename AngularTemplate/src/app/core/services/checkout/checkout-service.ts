import {computed, inject, Injectable, signal} from '@angular/core';
import {CartService} from "../cart/cart-service";
import {ShippingSend} from "../../interfaces/checkout/shippingSend";
import {PaymentSend} from "../../interfaces/checkout/paymentSend";
import {OrderSend} from "../../interfaces/checkout/orderSend";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class CheckoutService {
    shippingSend = signal<ShippingSend | null>(null)
    paymentSend = signal<PaymentSend | null>(null)
    private cartService = inject(CartService);
    private URL = environment.url;
    private http = inject(HttpClient)

    finalOrder = computed<OrderSend | null>(() => {
        const cupon = this.cartService.cupon();

        const cartItems = this.cartService.cart()
        const shipping = this.shippingSend();
        const payment = this.paymentSend();

        if (this.cartService.countItems() === 0 || !shipping || !payment) {
            return null
        }

        return {
            shipping: shipping,
            payment: payment,
            items: cartItems.map(item => ({
                book_id: item.book.id,
                count: item.count
            })),
            total: Math.round(this.cartService.total() * 100) /100,
            cupon_code: cupon.id > 0 ? cupon.code : undefined
        };
    })


    post(order:any){
        return this.http.post(`${this.URL}/order/`, order)
    }


}
