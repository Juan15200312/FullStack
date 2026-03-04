import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {Router} from "@angular/router";

@Component({
    selector: 'app-order',
    imports: [
        ReactiveFormsModule,
        NgClass
    ],
    templateUrl: './order.html',
    styleUrl: './order.scss',
})
export class Order {
    private fb = inject(FormBuilder)
    private router = inject(Router);
    protected formOrder = this.fb.group({
        slug: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
    })

    isFieldInvalid(field: string): boolean {
        const control = this.formOrder.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    verifyOrder(){
        if (this.formOrder.invalid){
            console.log('El formulario es invalido')
            return;
        }

        const { slug, email } = this.formOrder.value;

        this.router.navigate(['/orders', slug], {
            queryParams: { email }
        });

    }




}
