import {ShippingSend} from "./shippingSend";
import {PaymentSend} from "./paymentSend";

export interface OrderSend {
    shipping: ShippingSend,
    payment: PaymentSend,
    items: {
        book_id: number,
        count: number,
    }[],
    total: number,
    cupon_code?: string,
}