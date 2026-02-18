import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Alert} from "./shared/components/popups/alert/alert";
import {AlertService} from "./core/services/alerts/alert-service";
import {MessageService} from "./core/services/messages/message-service";
import {Messages} from "./shared/components/popups/messages/messages";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Alert, Messages],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('TemplateAngular');

  protected alertService = inject(AlertService)
  protected alertConfig = this.alertService.config

  protected messageService = inject(MessageService)
  protected messageConfig = this.messageService.config


}
