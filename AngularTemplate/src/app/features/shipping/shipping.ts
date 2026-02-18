import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {CartService} from "../../core/services/cart/cart-service";
import {NgClass} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
    selector: 'app-shipping',
    imports: [
        RouterLink,
        NgClass,
        ReactiveFormsModule
    ],
    templateUrl: './shipping.html',
    styleUrl: './shipping.scss',
})
export class Shipping {
    protected cartService = inject(CartService)
    protected optionDelivery= 'delivery1';
    private formBuilder = inject(FormBuilder);

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
    }
}
