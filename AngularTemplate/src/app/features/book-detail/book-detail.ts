import {Component, inject} from '@angular/core';
import {BooksService} from "../../core/services/books/books.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-book-detail',
    imports: [],
    templateUrl: './book-detail.html',
    styleUrl: './book-detail.scss',
})
export class BookDetail {
    private bookService = inject(BooksService);
    private route = inject(ActivatedRoute);

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const slug = params.get('slug');

            this.bookService.bookDetail(slug).subscribe({
                next: response => {
                    console.log(response);
                }, error: error => {
                    console.log(error);
                }
            })
        })
    }
}
