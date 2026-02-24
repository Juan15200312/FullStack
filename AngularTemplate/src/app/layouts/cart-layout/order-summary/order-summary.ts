import {Component, inject, input, InputSignal, output} from '@angular/core';
import {CartService} from "../../../core/services/cart/cart-service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CuponService} from "../../../core/services/cupon/cupon-service";
import {SessionStorageService} from "../../../core/services/sessionStorage/session-storage.service";
import {AlertQuestionService} from "../../../core/services/alerts-question/alert-question-service";

@Component({
    selector: 'app-order-summary',
    imports: [
        ReactiveFormsModule,
    ],
    templateUrl: './order-summary.html',
    styleUrl: './order-summary.scss',
})
export class OrderSummary {
    protected cartService = inject(CartService);
    formPayment = input<FormGroup>();
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    onSubmitShipping = output<void>();
    onSubmitPayment = output<void>();
    private cuponService = inject(CuponService);
    private sessionStorage = inject(SessionStorageService)
    private fb = inject(FormBuilder)
    private alertQuestionService = inject(AlertQuestionService);
    protected formCupon = this.fb.group({
        code: ['', Validators.required],
    })

    nameButton(){
        const url = this.router.url;
        if (url.includes('shipping')) return 'Continuar al pago';
        if (url.includes('payment')) return 'Confirmar y pagar';
        return 'Tramitar pedido';
    }


    validateCupon(){
        const code = this.formCupon.value.code
        this.cuponService.post(code).subscribe({
            next: response => {
                this.cartService.cupon.set(response)
                this.alertQuestionService.notify(
                    () => {
                        this.alertQuestionService.close()
                    },
                    false,
                    'Felicidades, obtuviste un ${response.discount}% de descuento en tu compra',
                    '¡Cupon agregado!',
                    'fa-solid fa-user-astronaut',
                    'success',
                    'Aceptar',
                )
            }, error: error => {
                console.log(error);
                this.alertQuestionService.notify(
                    () => {
                        this.alertQuestionService.close()
                    },
                    false,
                    error.error,
                    '¡Error con el cupon!',
                    'fa-solid fa-user-astronaut',
                    'danger',
                    'Entendido',
                )
            }
        })
    }

    deleteCupon(){
        if (this.sessionStorage.get('cupon')){
            this.sessionStorage.remove('cupon')
            this.cartService.clearCupon()
        }
    }

    verify() {
        this.route.data.subscribe((data) => {
            const url = data['url'];

            if (url === 'cart'){
                this.router.navigateByUrl('/cart/shipping');
            }else if(url === 'shipping'){
                this.onSubmitShipping.emit();
            }else if(url === 'payment'){
                this.onSubmitPayment.emit();
            }
        })
    }

}
