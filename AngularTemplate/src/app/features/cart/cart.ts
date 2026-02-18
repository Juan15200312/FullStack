import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CartService} from "../../core/services/cart/cart-service";
import {cartInterface} from "../../core/interfaces/cart/cartInterface";

@Component({
  selector: 'app-cart',
  imports: [
    RouterLink

  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  protected cartService = inject(CartService)


}
