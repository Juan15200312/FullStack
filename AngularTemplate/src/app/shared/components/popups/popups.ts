import {Component, HostListener, inject, input, output, signal} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-popups',
  imports: [],
  templateUrl: './popups.html',
  styleUrl: './popups.scss',
})
export class Popups {
  onClose = output<void>();
  type = input<string>('success');
  alertGuard = input<boolean>(true);
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
