import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {CartService} from "../cart/cart-service";
import {ShippingSend} from "../../interfaces/checkout/shippingSend";
import {PaymentSend} from "../../interfaces/checkout/paymentSend";
import {OrderSend} from "../../interfaces/checkout/orderSend";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {SessionStorageService} from "../sessionStorage/session-storage.service";
import {Observable} from "rxjs";
import {OrderPartResponse} from "../../interfaces/checkout/order-part-Response";
import {Pagination} from "../../interfaces/pagination/pagination";

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

    expectedDeliveryDates(delivery:boolean) {
        const now = new Date();
        const from = new Date(now);
        from.setDate(now.getDate() + 1)
        const to = new Date(now);
        if(delivery){
            to.setDate(now.getDate() + 1);
        }else {
            to.setDate(now.getDate() + 4);
        }

        const format = (date: Date) =>
            `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;

        return {
            from: format(from),
            to: format(to)
        };
    }


    finalOrder = computed<OrderSend | null>(() => {
        const cupon = this.cartService.cupon();

        const cartItems = this.cartService.cart()
        const shipping = this.shipping();
        const payment = this.payment();

        if (this.cartService.countItems() === 0 || !shipping || !payment) {
            return null
        }
        const d:boolean = shipping.delivery === 'EX';
        const dates = this.expectedDeliveryDates(d)

        return {
            shipping: shipping,
            payment: payment,
            items: cartItems.map(item => ({
                book_id: item.book.id,
                count: item.count
            })),
            total: Math.round(this.cartService.total() * 100) /100,
            cupon_code: cupon ? cupon.code : undefined,
            expected_delivery_from: dates.from,
            expected_delivery_to: dates.to,
        };
    })


    post(order:any){
        return this.http.post<any>(`${this.URL}/order/`, order)
    }

    searchOrder(data:any){
        const options: any = {};

        if (data.email) {
            options.params = { email: data.email };
        }

        return this.http.get<any>(`${this.URL}/order/${data.slug}/`, options);
    }

    orderDetailPart(pag:number){
        return this.http.get<Pagination<OrderPartResponse>>(`${this.URL}/orders-part/?page=${pag}`)
    }
}
