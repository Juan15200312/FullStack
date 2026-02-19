import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class CuponService {

  private URL = environment.url;
  private httpClient = inject(HttpClient);


  post(code:string){
    this.httpClient.post<any>(`${this.URL}/cupon/`, {code: code})
  }


}
