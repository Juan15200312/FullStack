import {Component, HostListener, input, output} from '@angular/core';

@Component({
  selector: 'app-popups',
  imports: [],
  templateUrl: './popups.html',
  styleUrl: './popups.scss',
})
export class Popups {
  onClose = output<void>();
  type = input<string>('success');

  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    this.cancelar();
  }

  cancelar() {
    this.onClose.emit();
  }
}
