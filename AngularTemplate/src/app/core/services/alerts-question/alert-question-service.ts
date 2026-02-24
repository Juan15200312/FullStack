import {Injectable, signal} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AlertQuestionService {
    show = signal(false);
    config = signal<any>({})

    notify(
        action: () => void = () => {
        },
        viewButtonCa: boolean,
        message: string = 'Hola desde la configuracion',
        title: string = 'Bienvenido',
        icon: string = 'fa-solid fa-right-from-bracket',
        color: string = 'success',
        textButtonAc: string = 'Aceptar',
        textButtonCa: string = 'Cancelar',
    ) {
        let config = {
            title: title, message: message, icon: icon, color: color, action: action, viewButtonCa: viewButtonCa,
            textButtonAc: textButtonAc, textButtonCa: textButtonCa
        };
        this.config.set(config);
        this.show.set(true);
    }

    close() {
        this.show.set(false);
    }
}
