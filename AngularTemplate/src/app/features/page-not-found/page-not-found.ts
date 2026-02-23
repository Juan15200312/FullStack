import { Component } from '@angular/core';
import {Header} from "../../layouts/main-layouts/componets/header/header";
import {Footer} from "../../layouts/main-layouts/componets/footer/footer";

@Component({
  selector: 'app-page-not-found',
  imports: [
    Header,
    Footer
  ],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.scss',
})
export class PageNotFound {

}
