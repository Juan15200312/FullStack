import {Component, inject, OnInit, signal} from '@angular/core';
import {BookResponse} from "../../core/interfaces/books/bookResponse";
import {BooksService} from "../../core/services/books/books.service";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-wishlist',
    imports: [
        NgClass
    ],
    templateUrl: './wishlist.html',
    styleUrl: './wishlist.scss',
})
export class Wishlist implements OnInit {
    protected wishlist = signal<BookResponse[]>([])
    private bookService = inject(BooksService)

    ngOnInit() {
        this.loadData()
    }


    private loadData() {
        this.bookService.getWishList().subscribe({
            next: response => {
                this.wishlist.set(response);
            }, error: error => {
                console.log(error);
            }
        })
    }

    deleteBookWishlist(slug: string) {
        this.bookService.deleteWishList(slug).subscribe({
            next: response => {
                this.loadData()
            }, error: error => {
                console.log(error);
            }
        })
    }

}
