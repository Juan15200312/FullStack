import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LoginSend} from "../../interfaces/auth/loginSend";

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private URL:string = environment.url;
  private http: HttpClient = inject(HttpClient);


  login(data:LoginSend){
    return this.http.post<any>(`${this.URL}/login/`, data)
  }

  register(data:any){
    return this.http.post<any>(`${this.URL}/register/`, data)
  }


  refreshToken(refresh_token:string){
    return this.http.post<any>(`${this.URL}/token/refresh/`, {refresh : refresh_token})
  }

}
