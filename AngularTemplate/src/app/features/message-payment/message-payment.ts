import {Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {MessageService} from "../../core/services/messages/message-service";
import {UserService} from "../../core/services/user/user-service";

@Component({
  selector: 'app-message-payment',
  imports: [
    RouterLink
  ],
  templateUrl: './message-payment.html',
  styleUrl: './message-payment.scss',
})
export class MessagePayment {
  private router = inject(Router)
  private order = signal<any>(null);
  private messageService = inject(MessageService)


  ngOnInit() {
    const state = window.history.state;
    if (state && state.data) {
      this.order.set(state.data);
    }
  }

  copyText() {
    navigator.clipboard.writeText(this.orderSlug).then(r => {
      this.messageService.notify({
        icon: 'fa-solid fa-thumbs-up',
        message: '¡Copiado!',
        color: 'success',
        view: true,
      })
    })
  }

  get customerName() {
    return this.order()?.names_shipping.split(' ')[0] || 'Cliente';
  }

  get orderSlug() {
    return this.order()?.slug || '---';
  }
}
