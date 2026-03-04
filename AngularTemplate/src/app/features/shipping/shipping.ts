import {Component, inject} from '@angular/core';
import {CartService} from "../../core/services/cart/cart-service";
import {NgClass} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {OrderSummary} from "../../layouts/cart-layout/order-summary/order-summary";
import {Router} from "@angular/router";
import {CheckoutService} from "../../core/services/checkout/checkout-service";
import {ShippingSend} from "../../core/interfaces/checkout/shippingSend";

@Component({
    selector: 'app-shipping',
    imports: [
        NgClass,
        ReactiveFormsModule,
        OrderSummary
    ],
    templateUrl: './shipping.html',
    styleUrl: './shipping.scss',
})
export class Shipping {
    protected cartService = inject(CartService)
    protected optionDelivery:string = 'ST';
    private formBuilder = inject(FormBuilder);
    private router = inject(Router);
    private checkoutService = inject(CheckoutService)

    protected formDeliveryInfo:FormGroup = this.formBuilder.group({
        names_shipping: ['', Validators.required],
        street_address: ['', Validators.required],
        city: ['', Validators.required],
        zip_code: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        delivery: ['ST']
    })

    isFieldInvalid(field: string): boolean {
        const control = this.formDeliveryInfo.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    changeDelivery(delivery:string){
        this.optionDelivery= delivery;
        if (delivery == 'ST'){
            this.cartService.delivery.set(5)
            this.formDeliveryInfo.patchValue({
                delivery: 'ST'
            })
        }else {
            this.cartService.delivery.set(10)
            this.formDeliveryInfo.patchValue({
                delivery: 'EX'
            })
        }
    }

    verifyShipping(){
        let shipping:ShippingSend = {delivery: this.cartService.delivery(), ...this.formDeliveryInfo.value}
        this.checkoutService.shipping.set(shipping)
        this.router.navigate(['cart/payment']);
    }
}
