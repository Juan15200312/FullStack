import {Component, inject, signal} from '@angular/core';
import {CategoryResponse} from "../../core/interfaces/books/categoryResponse";
import {CategoryService} from "../../core/services/books/category/category.service";

@Component({
    selector: 'app-dashboard',
    imports: [],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
})
export class Dashboard {
    protected categories = signal<CategoryResponse[]>([])
    private categoryService = inject(CategoryService);

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


}
