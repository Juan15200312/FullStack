import {Component, inject, signal} from '@angular/core';
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
export class Wishlist {
  protected wishlist = signal<BookResponse[]>([])
  private bookService = inject(BooksService)

  ngOnInit() {
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
          this.bookService.getWishList().subscribe({
            next: response => {
              this.wishlist.set(response);
            }, error: error => {
              console.log(error);
            }
          })
        }, error: error => {
          console.log(error);
        }
      })
  }

}
