import {Injectable, signal} from '@angular/core';
import {AlertConfig} from "../../interfaces/popups/alertConfig";

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  show = signal(false);
  config = signal<AlertConfig>({
    type: 'success', icon: 'bi bi-check', title: '¡Exito!', message: 'Bienvenido otra vez a BookLy', color: 'success', guard: false
  })

  notify(config: AlertConfig) {
    this.config.set(config);
    this.show.set(true);
  }

  close() {
    this.show.set(false);
  }
}
