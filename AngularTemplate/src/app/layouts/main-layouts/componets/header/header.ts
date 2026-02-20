import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CartService} from "../../../../core/services/cart/cart-service";

@Component({
  selector: 'app-header',
    imports: [
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
    protected cartService = inject(CartService)
}
