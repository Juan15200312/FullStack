import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";

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

}
