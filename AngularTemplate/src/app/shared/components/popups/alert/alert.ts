import {Component, HostListener, inject, input, output} from '@angular/core';
import {Router} from "@angular/router";

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
  type = input<string>('success');
  alertGuard = input<boolean>(true);
  onClose = output<void>();
  router = inject(Router);

  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    this.cancelar();
  }

  cancelar() {
    this.onClose.emit();
  }

  login(){
    this.cancelar()
    this.router.navigate(['/auth']);
  }

}
