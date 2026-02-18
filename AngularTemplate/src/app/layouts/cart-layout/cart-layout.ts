import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";
import {CartService} from "../../core/services/cart/cart-service";

@Component({
    selector: 'app-cart-layout',
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        NgClass
    ],
    templateUrl: './cart-layout.html',
    styleUrl: './cart-layout.scss',
})
export class CartLayout {
    protected cartService = inject(CartService);
    private router = inject(Router);


    url(){
        return this.router.url.includes('shipping') || this.router.url.includes('payment')
    }


}
