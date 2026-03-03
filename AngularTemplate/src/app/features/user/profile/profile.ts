import {Component, inject, signal} from '@angular/core';
import {UserService} from "../../../core/services/user/user-service";
import {NgClass} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {InfoPersonal} from "../../../core/interfaces/user/infoPersonal";
import {NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-profile',
    imports: [
        NgClass,
        ReactiveFormsModule,
    ],
    templateUrl: './profile.html',
    styleUrl: './profile.scss',
})
export class Profile {
    protected userService = inject(UserService);
    private infoPersonal = signal<InfoPersonal | null>(null)
    private fb = inject(FormBuilder);
    private imageSelected: File | null = null
    protected formPerfil = this.fb.group({
        names: [this.infoPersonal()?.names, Validators.required],
        email: [this.infoPersonal()?.email, [Validators.required, Validators.email]],
        phone: [this.infoPersonal()?.phone, this.infoPersonal()?.phone !== '' ? [Validators.minLength(12), Validators.maxLength(12)] : '' ],
        date_birth: [this.infoPersonal()?.date_birth, ],
    })

    isFieldInvalid(field: string): boolean {
        const control = this.formPerfil.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }


    ngOnInit() {
        this.userService.getInfoPersonal().subscribe({
            next: response => {
                this.infoPersonal.set(response);
                this.formPerfil.patchValue(response)
                console.log(this.formPerfil.value);
            }, error: error => {
                console.log(error);
            }
        })
    }

    removePhoto(){
        this.userService.updateInfoPersonal({...this.infoPersonal(), photo_perfil: null}).subscribe({
            next: response => {
                console.log(response);
                this.infoPersonal.set(response);
                this.formPerfil.patchValue(response)
            },
            error: error => {
                console.log(error);
            }
        })
        this.userService.user.set({
            ...this.userService.user()!,
            photo_perfil: '',
        })
    }

    updateInfoPersonal() {
        if (this.formPerfil.invalid) {
            console.log('Formulario invalido')
            return;
        }

        const info = this.formPerfil.value
        console.log(info)
        this.userService.updateInfoPersonal(info).subscribe({
            next: response => {
                console.log(response);
                this.infoPersonal.set(response);
                this.formPerfil.patchValue(response)
            },
            error: error => {
                console.log(error);
            }
        })
    }


    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files?.length) {
            this.imageSelected = input.files[0];
            this.uploadPhoto(this.imageSelected);
        }
        input.value = '';
    }

    uploadPhoto(file: File) {
        const formData = new FormData();
        formData.append('photo_perfil', file);

        this.userService.updateInfoPersonal(formData).subscribe({
            next: response => {
                this.infoPersonal.set(response);
                this.userService.user.set(response);
            },
            error: err => console.error('Error subiendo imagen', err)
        });
    }
}
