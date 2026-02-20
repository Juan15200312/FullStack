import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CartService} from "../../core/services/cart/cart-service";
import {NgClass} from "@angular/common";
import {OrderSummary} from "../../layouts/cart-layout/order-summary/order-summary";
import {Router} from "@angular/router";
import {CheckoutService} from "../../core/services/checkout/checkout-service";
import {PaymentSend} from "../../core/interfaces/checkout/paymentSend";

@Component({
    selector: 'app-payment',
    imports: [
        ReactiveFormsModule,
        NgClass,
        OrderSummary
    ],
    templateUrl: './payment.html',
    styleUrl: './payment.scss',
})
export class Payment {
    protected cartService = inject(CartService)
    protected typePayment:string = 'debit-card'
    protected fb = inject(FormBuilder)
    private router = inject(Router)
    private checkoutService = inject(CheckoutService)

    protected formPayment = this.fb.group({
        names: ['', Validators.required],
        card_number: ['', [Validators.required, Validators.minLength(19), Validators.maxLength(19)]],
        exp: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    })

    isFieldInvalid(field: string): boolean {
        const control = this.formPayment.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }


    changeTypePayment = (payment:string) => {
        this.typePayment = payment;
        this.cartService.method.set(this.typePayment);
    }

    verifyPayment() {
        console.log('paso la verificacion')
        const payment: PaymentSend = <PaymentSend>{method: this.cartService.method(), ...this.formPayment.value}
        this.checkoutService.paymentSend.set(payment)
        console.log(this.checkoutService.finalOrder())
        const pedidoParaEnviar = this.checkoutService.finalOrder();
        this.checkoutService.post(pedidoParaEnviar).subscribe({
            next: response => {
                console.log(response)
            }, error: error => {
                console.log(error)
            }
        })

    }


    formatCardNumber(event: any) {
        let value = event.target.value.replace(/\D/g, '');

        let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');

        this.formPayment.get('card_number')?.setValue(formattedValue, { emitEvent: false });
    }

    formatExpiryDate(event: any) {
        let value = event.target.value.replace(/\D/g, '');

        if (value.length >= 3) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }

        this.formPayment.get('exp')?.setValue(value, { emitEvent: false });
    }

    formatCVV(event: any) {
        let value = event.target.value.replace(/\D/g, '');

        this.formPayment.get('cvv')?.setValue(value, { emitEvent: false });
    }

}
