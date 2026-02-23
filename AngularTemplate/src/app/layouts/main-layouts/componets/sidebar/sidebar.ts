import {Component, HostListener, inject, output} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  onClose = output<void>();
  router = inject(Router);

  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    this.cancelar();
  }


  cancelar() {
    this.onClose.emit();
  }

}
