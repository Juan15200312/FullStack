import {Component, input} from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  icon = input<string>('bi bi-check')
  title = input<string>('Titulo de la alerta')
  message = input<string>('Este sera el mensaje que lleve la alerta')
  color = input<string>('success')
}
