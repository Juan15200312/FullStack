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

            this.bookService.get(category).subscribe({
                next: response => {
                    this.books.set(response.books)
                    this.nameCategory.set(response.category.name);
                    this.countBooks.set(response.count);
                }, error: error => {
                    console.log(error);
                }
            })

        })
    }

    addWishlist(slug: string) {
        this.bookService.addWishlist(slug).subscribe({
            next: response => {
                this.alertQuestionService.notify(
                    () => {
                        this.alertQuestionService.close()
                    },
                    false,
                    response.message,
                    '¡Libro agregado!',
                    'fa-solid fa-heart-circle-check',
                    'success',
                    'Aceptar',
                )
            }, error: error => {
                this.alertQuestionService.notify(
                    () => {
                        this.alertQuestionService.close()
                    },
                    false,
                    error.error.message,
                    '¡Error!',
                    'fa-solid fa-heart-circle-exclamation',
                    'danger',
                    'Entendido',
                )
            }
        })

    }
}
