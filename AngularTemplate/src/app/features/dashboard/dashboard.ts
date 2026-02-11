import {Component, inject, signal} from '@angular/core';
import {CategoryResponse} from "../../core/interfaces/books/categoryResponse";
import {CategoryService} from "../../core/services/books/category/category.service";
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'app-dashboard',
    imports: [
        RouterLink
    ],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
})
export class Dashboard {
    protected categories = signal<CategoryResponse[]>([])
    private categoryService = inject(CategoryService);
    protected router = inject(Router);

    ngOnInit() {
        this.categoryService.get().subscribe({
            next: response => {
                this.categories.set(response);
                console.log(response)
            }, error: error => {
                console.log(error);
            }
        })

    }


    redirect(){
        this.router.navigate(['/categories'])
    }

}
