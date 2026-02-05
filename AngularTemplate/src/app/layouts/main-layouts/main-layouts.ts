import { Component } from '@angular/core';
import {Header} from "./componets/header/header";
import {Footer} from "./componets/footer/footer";

@Component({
  selector: 'app-main-layouts',
  imports: [
    Header,
    Footer
  ],
  templateUrl: './main-layouts.html',
  styleUrl: './main-layouts.scss',
})
export class MainLayouts {

}
