import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MessageService} from "./core/services/messages/message-service";
import {Messages} from "./shared/components/popups/messages/messages";
import {AlertQuestionService} from "./core/services/alerts-question/alert-question-service";
import {AlertQuestion} from "./shared/components/popups/alert-question/alert-question";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Messages, AlertQuestion],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('TemplateAngular');


  protected alertQuestionService = inject(AlertQuestionService)
  protected alertQuestionConfig = this.alertQuestionService.config

  protected messageService = inject(MessageService)
  protected messageConfig = this.messageService.config


}
