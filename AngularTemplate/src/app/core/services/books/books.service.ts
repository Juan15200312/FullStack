import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookResponse} from "../../interfaces/books/bookResponse";

@Injectable({
    providedIn: 'root',
})
export class BooksService {
    private URL = environment.url;
    private http = inject(HttpClient)


    get(category:any): Observable<BookResponse> {
        return this.http.get<any>(`${this.URL}/books/${category}/`);
    }
}
