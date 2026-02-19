import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CartService} from "../../core/services/cart/cart-service";
import {cartInterface} from "../../core/interfaces/cart/cartInterface";
import {OrderSummary} from "../../layouts/cart-layout/order-summary/order-summary";

@Component({
  selector: 'app-cart',
    imports: [
        OrderSummary
    ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  protected cartService = inject(CartService)


}
