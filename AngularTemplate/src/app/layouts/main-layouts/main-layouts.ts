import { Component } from '@angular/core';
import {Header} from "./componets/header/header";
import {Footer} from "./componets/footer/footer";
import {Dashboard} from "../../features/dashboard/dashboard";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-layouts',
    imports: [
        Header,
        Footer,
        RouterOutlet
    ],
  templateUrl: './main-layouts.html',
  styleUrl: './main-layouts.scss',
})
export class MainLayouts {

}
