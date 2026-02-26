import {Component, inject, signal} from '@angular/core';
import {BooksService} from "../../core/services/books/books.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookResponse} from "../../core/interfaces/books/bookResponse";
import {CartService} from "../../core/services/cart/cart-service";
import {UserService} from "../../core/services/user/user-service";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-book-detail',
    imports: [
        NgClass
    ],
    templateUrl: './book-detail.html',
    styleUrl: './book-detail.scss',
})
export class BookDetail {
    private bookService = inject(BooksService);
    protected bookDetail = signal<BookResponse | null>(null)
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private cartService = inject(CartService);
    protected userService = inject(UserService);


    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const slug = params.get('slug');
            this.bookService.bookDetail(slug).subscribe({
                next: response => {
                    console.log(response);
                    this.bookDetail.set(response)
                }, error: error => {
                    console.log(error);
                }
            })
        })
    }

    addCart(go:boolean) {
        const book = this.bookDetail()
        if (book) {
            this.cartService.add(book, true)
        }
        if (go) {
            this.router.navigate(['/cart']);
        }
    }

    addWishlist() {
        const book = this.bookDetail()
        if (book) {
            this.bookService.addWishlistEj(book.slug)
        }
    }

    fechas(){
        const months: { [key: number]: string } = {
            1: 'Enero',
            2: 'Febrero',
            3: 'Marzo',
            4: 'Abril',
            5: 'Mayo',
            6: 'Junio',
            7: 'Julio',
            8: 'Agosto',
            9: 'Septiembre',
            10: 'Octubre',
            11: 'Noviembre',
            12: 'Diciembre'
        };
        const now = new Date();
        const dayNow = now.getDate() + 1;
        const monthNow = now.getMonth() + 1;

        const next = new Date();
        next.setDate(now.getDate() + 4);

        const dayNext = next.getDate();
        const monthNext = next.getMonth() + 1;

        return `${months[monthNow]} ${dayNow} - ${months[monthNext]} ${dayNext.toString().padStart(2, '0')}`;
    }

    stockBook(){
        const book = this.bookDetail()
        if (book) {
            return book.stock
        }
        return 0
    }

    priceBook(){
        const book = this.bookDetail()
        if (book) {
            return book.price.toFixed(2)
        }
        return 0
    }

}
