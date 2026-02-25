import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CartService} from "../../../../core/services/cart/cart-service";
import {Sidebar} from "../sidebar/sidebar";
import {UserService} from "../../../../core/services/user/user-service";
import {UserPopup} from "../../../../shared/components/popups/user-popup/user-popup";

@Component({
  selector: 'app-header',
    imports: [
        RouterLink,
        RouterLinkActive,
        Sidebar,
        UserPopup
    ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
    protected cartService = inject(CartService)
    protected userService = inject(UserService)
    showSidebar = signal<boolean>(false);
    showPopupUser = signal<boolean>(false);


    changeSidebar(){
        this.showSidebar.update(state => !state);
    }
}
