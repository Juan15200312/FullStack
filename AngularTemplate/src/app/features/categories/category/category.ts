import {Component, inject, signal} from '@angular/core';
import {BookResponse} from "../../../core/interfaces/books/bookResponse";
import {BooksService} from "../../../core/services/books/books.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category {
  private books = signal<BookResponse[]>([])
  private bookService = inject(BooksService)
  private route = inject(ActivatedRoute)

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let category = params.get("category");

      this.bookService.get(category).subscribe({
        next: response => {
          console.log(response)
        }, error: error => {
          console.log(error);
        }
      })

    })
  }
}
