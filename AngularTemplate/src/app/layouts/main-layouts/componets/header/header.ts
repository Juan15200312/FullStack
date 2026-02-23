import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CartService} from "../../../../core/services/cart/cart-service";
import {Sidebar} from "../sidebar/sidebar";

@Component({
  selector: 'app-header',
    imports: [
        RouterLink,
        RouterLinkActive,
        Sidebar
    ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
    protected cartService = inject(CartService)
    showSidebar = signal<boolean>(false);


    changeSidebar(){
        this.showSidebar.update(state => !state);
    }
}
