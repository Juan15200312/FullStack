import {inject, Injectable} from '@angular/core';
import {CategoryResponse} from "../../../interfaces/books/categoryResponse";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private URL = environment.url;
  private http = inject(HttpClient)


  get(): Observable<CategoryResponse[]> {
    return this.http.get<any>(`${this.URL}/categories/`);
  }


}
