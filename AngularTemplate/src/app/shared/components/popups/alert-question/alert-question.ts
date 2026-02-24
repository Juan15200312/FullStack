import {Component, HostListener, inject, input, output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-alert-question',
    imports: [],
    templateUrl: './alert-question.html',
    styleUrl: './alert-question.scss',
})
export class AlertQuestion {
    icon = input<string>()
    title = input<string>()
    message = input<string>()
    color = input<string>()
    textButtonAc = input<string>()
    textButtonCa = input<string>()
    viewButtonCa = input<boolean>(true)


    action = input<() => void>()

    ejecutar() {
        const executeAction = this.action();
        if (executeAction) {
            executeAction();
        }
    }

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
