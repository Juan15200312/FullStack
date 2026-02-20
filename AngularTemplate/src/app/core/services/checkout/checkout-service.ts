import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {CartService} from "../cart/cart-service";
import {ShippingSend} from "../../interfaces/checkout/shippingSend";
import {PaymentSend} from "../../interfaces/checkout/paymentSend";
import {OrderSend} from "../../interfaces/checkout/orderSend";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SessionStorageService} from "../sessionStorage/session-storage.service";

@Injectable({
    providedIn: 'root',
})
export class CheckoutService {
    private sessionStorage = inject(SessionStorageService)
    private URL = environment.url;
    private http = inject(HttpClient)
    private cartService = inject(CartService);
    shipping = signal<ShippingSend>(this.loadShipping())
    payment = signal<PaymentSend>(this.loadPayment())

    private sessionEffect = effect(() => {
        this.sessionStorage.set('shipping', JSON.stringify(this.shipping()));
        this.sessionStorage.set('payment', JSON.stringify(this.payment()));
    })

    private loadShipping(){
        if (this.sessionStorage.get('shipping')){
            return JSON.parse(this.sessionStorage.get('shipping'));
        }
        return null
    }

    private loadPayment(){
        if (this.sessionStorage.get('payment')){
            return JSON.parse(this.sessionStorage.get('payment'));
        }
        return null
    }

    public clearCheckout(){
        this.cartService.clearCart()
        this.payment.set(this.loadPayment())
        this.shipping.set(this.loadShipping())
    }


    finalOrder = computed<OrderSend | null>(() => {
        const cupon = this.cartService.cupon();

        const cartItems = this.cartService.cart()
        const shipping = this.shipping();
        const payment = this.payment();

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
