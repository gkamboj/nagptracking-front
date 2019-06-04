import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  roles:any[];
  dataFromService:any;
  private baseUrl: string = "http://localhost:8080/"; //before proxy config file
  private webBaseUrl: string = "";
  constructor(private http: HttpClient) { }

  loginAdmin(bodyToSend){
    return this.http.post(this.baseUrl+"admin/login", bodyToSend);
  }
  loginApplicant(bodyToSend){
    return this.http.post(this.baseUrl+"applicant/login",bodyToSend);
  }
}
