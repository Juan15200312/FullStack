import {Component, inject, signal} from '@angular/core';
import {BookResponse} from "../../../core/interfaces/books/bookResponse";
import {BooksService} from "../../../core/services/books/books.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-category',
  imports: [
    NgClass
  ],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category {
  protected books = signal<BookResponse[]>([])
  protected nameCategory = signal<string|null>(null)
  protected countBooks = signal<number|null>(null)
  private bookService = inject(BooksService)
  private route = inject(ActivatedRoute)

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let category = params.get("category");

      this.bookService.get(category).subscribe({
        next: response => {
          this.books.set(response.books)
          console.log(response.books);
          this.nameCategory.set(response.category.name);
          this.countBooks.set(response.count);
        }, error: error => {
          console.log(error);
        }
      })

    })
  }
}
