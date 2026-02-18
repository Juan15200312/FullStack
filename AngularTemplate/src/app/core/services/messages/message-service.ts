import {Injectable, signal} from '@angular/core';
import {AlertConfig} from "../../interfaces/popups/alertConfig";

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    show = signal(false);
    config = signal<any>(null)

    notify(config: any) {
        if (config.view) {
            this.config.set(config);
            this.show.set(true);
            setTimeout(() => {
                this.show.set(false);
            }, 1000);
        }
    }

    close() {
        this.show.set(false);
    }
}
