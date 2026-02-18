import {Component, HostListener, input, output} from '@angular/core';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.html',
  styleUrl: './messages.scss',
})
export class Messages {
  icon = input<string>('fa-solid fa-face-smile-wink')
  message = input<string>('Bien hecho');
  color = input<string>('success');
  view = input<boolean>(true);
  onClose = output<void>();

  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    this.cancelar();
  }

  cancelar() {
    this.onClose.emit();
  }
}
