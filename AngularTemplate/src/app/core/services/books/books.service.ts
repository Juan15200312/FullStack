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


    get(category:any): Observable<any> {
        return this.http.get<any>(`${this.URL}/books/category/${category}/`);
    }

    getWishList(): Observable<any>{
        return this.http.get<any>(`${this.URL}/wishlist/`);
    }

    deleteWishList(slug:string){
        return this.http.delete<any>(`${this.URL}/wishlist/${slug}/`,);
    }

    addWishlist(slug:string){
        return this.http.post<any>(`${this.URL}/wishlist/${slug}/`, {});
    }

    bookDetail(slug:any){
        return this.http.get(`${this.URL}/books/${slug}/`);
    }

}
