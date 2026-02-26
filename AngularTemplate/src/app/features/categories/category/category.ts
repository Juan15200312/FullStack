import {Component, inject, signal} from '@angular/core';
import {BookResponse} from "../../../core/interfaces/books/bookResponse";
import {BooksService} from "../../../core/services/books/books.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {CartService} from "../../../core/services/cart/cart-service";
import {AlertQuestionService} from "../../../core/services/alerts-question/alert-question-service";
import {UserService} from "../../../core/services/user/user-service";

@Component({
    selector: 'app-category',
    imports: [
        NgClass,
        RouterLink
    ],
    templateUrl: './category.html',
    styleUrl: './category.scss',
})
export class Category {
    protected books = signal<BookResponse[]>([])
    protected nameCategory = signal<string | null>(null)
    protected countBooks = signal<number | null>(null)
    private bookService = inject(BooksService)
    private route = inject(ActivatedRoute)
    protected cartService = inject(CartService)
    private alertQuestionService = inject(AlertQuestionService)
    protected userService = inject(UserService)

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            let category = params.get("category");
            console.log(category)
            if (category === 'new-arrivals') {
                this.bookService.getNewArrivals().subscribe({
                    next: response => {
                        this.books.set(response)
                        this.nameCategory.set('Recien llegados');
                        this.countBooks.set(this.books().length);
                    }, error: error => {
                        console.log(error);
                    }
                })
            }else {
                this.bookService.get(category).subscribe({
                    next: response => {
                        this.books.set(response.books)
                        this.nameCategory.set(response.category.name);
                        this.countBooks.set(response.count);
                    }, error: error => {
                        console.log(error);
                    }
                })
            }


        })
    }

    addWishlist(slug: string) {
        this.bookService.addWishlistEj(slug)
    }
}
