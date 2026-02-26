import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookResponse} from "../../interfaces/books/bookResponse";
import {AlertQuestionService} from "../alerts-question/alert-question-service";
import {CartService} from "../cart/cart-service";

@Injectable({
    providedIn: 'root',
})
export class BooksService {
    private URL = environment.url;
    private http = inject(HttpClient)
    private alertQuestionService = inject(AlertQuestionService)


    get(category:any): Observable<any> {
        return this.http.get<any>(`${this.URL}/books/category/${category}/`);
    }

    getWishList(): Observable<any>{
        return this.http.get<any>(`${this.URL}/wishlist/`);
    }

    getNewArrivals(): Observable<any>{
        return this.http.get<any>(`${this.URL}/books/new-arrivals/all/`);
    }

    deleteWishList(slug:string){
        return this.http.delete<any>(`${this.URL}/wishlist/${slug}/`,);
    }

    addWishlist(slug:string){
        return this.http.post<any>(`${this.URL}/wishlist/${slug}/`, {});
    }

    bookDetail(slug:any){
        return this.http.get<BookResponse>(`${this.URL}/books/${slug}/`);
    }

    addWishlistEj(slug: string) {
        this.addWishlist(slug).subscribe({
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
