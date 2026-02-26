import {Component, inject, signal} from '@angular/core';
import {CategoryResponse} from "../../core/interfaces/books/categoryResponse";
import {CategoryService} from "../../core/services/books/category/category.service";
import {Router, RouterLink} from "@angular/router";
import {Scroll} from "../../shared/directives/scroll";
import {AlertQuestionService} from "../../core/services/alerts-question/alert-question-service";
import {BooksService} from "../../core/services/books/books.service";
import {BookResponse} from "../../core/interfaces/books/bookResponse";
import {CartService} from "../../core/services/cart/cart-service";

@Component({
    selector: 'app-dashboard',
    imports: [
        RouterLink,
        Scroll
    ],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
})
export class Dashboard {
    protected categories = signal<CategoryResponse[]>([])
    protected newArrivals = signal<BookResponse[]>([])
    private categoryService = inject(CategoryService);
    protected router = inject(Router);
    protected bookService = inject(BooksService);
    protected cartService = inject(CartService);

    ngOnInit() {
        this.categoryService.get().subscribe({
            next: response => {
                this.categories.set(response);
            }, error: error => {
                console.log(error);
            }
        })

        this.bookService.getNewArrivals().subscribe({
            next: response => {
                this.newArrivals.set(response);
            }, error: error => {
                console.log(error);
            }
        })
    }


}
