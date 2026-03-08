import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../core/services/user/user-service";

@Component({
    selector: 'app-order',
    imports: [
        ReactiveFormsModule,
        NgClass,
        RouterLink
    ],
    templateUrl: './order.html',
    styleUrl: './order.scss',
})
export class Order {
    private fb = inject(FormBuilder)
    private router = inject(Router);
    protected userService = inject(UserService);
    protected formOrder = this.fb.group({
        slug: ['', Validators.required],
        email: ['',
            this.userService.user() ? [Validators.email] : [Validators.email, Validators.required]
        ],
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

        if (this.userService.user()){
            const { slug } = this.formOrder.value;

            this.router.navigate(['/orders', slug]);
        }else {
            const { slug, email } = this.formOrder.value;

            this.router.navigate(['/orders', slug], {
                queryParams: { email }
            });
        }

    }




}
