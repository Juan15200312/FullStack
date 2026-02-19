import {Component, inject} from '@angular/core';
import {CartService} from "../../core/services/cart/cart-service";
import {NgClass} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {OrderSummary} from "../../layouts/cart-layout/order-summary/order-summary";
import {Router} from "@angular/router";

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
    protected optionDelivery= 'delivery1';
    private formBuilder = inject(FormBuilder);
    private router = inject(Router);

    protected formDeliveryInfo:FormGroup = this.formBuilder.group({
        names: ['', Validators.required],
        street_address: ['', Validators.required],
        city: ['', Validators.required],
        zip_code: ['', Validators.required],
        phone: ['', Validators.required],
    })

    isFieldInvalid(field: string): boolean {
        const control = this.formDeliveryInfo.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    changeDelivery(delivery:string){
        this.optionDelivery= delivery;
        if (delivery == 'delivery1'){
            this.cartService.delivery.set(5)
        }else {
            this.cartService.delivery.set(10)
        }
    }

    verifyShipping(){
        console.log('paso la verificacion')
        this.router.navigate(['cart/payment']);
    }
}
