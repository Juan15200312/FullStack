import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Alert} from "./shared/components/popups/alert/alert";
import {Popups} from "./shared/components/popups/popups";
import {AlertService} from "./core/services/alerts/alert-service";

@Component({
  selector: 'app-root',
    imports: [RouterOutlet, Alert, Popups],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('TemplateAngular');

  protected alertService = inject(AlertService)
  protected alertConfig = this.alertService.config


}
