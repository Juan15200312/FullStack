import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CuponService {

  private URL = environment.url;
  private http = inject(HttpClient);


  post(code:any){
    return this.http.post<any>(`${this.URL}/cupon/`, {code: code})
  }


}
