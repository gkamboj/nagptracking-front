import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(
    private http: HttpClient
  ) { }
  baseUrl: string = 'http://localhost:8080/';
  baseUrlWithProxy: string = 'applicant/';
  baseUrlNetwork: string = '';

  addApplicant(applicantToAdd) {
    return this.http.post(this.baseUrl + "admin/applicant/", applicantToAdd);
  }

  getAllApplicants(pageNo, pageSize) {
    return this.http.get(this.baseUrl + "admin/applicant?pageNo=" + pageNo + "&pageSize=" + pageSize);
  }

  getApplicantById(id: number) {
    return this.http.get(this.baseUrl + "admin/applicant/" + id);
  }

  editApplicant(id, bodyToSend) {
    return this.http.put(this.baseUrl + "admin/applicant/" + id, bodyToSend);
  }

  editApplicantByApplicant(id, bodyToSend) {
    return this.http.put(this.baseUrl + "applicant/" + id, bodyToSend)
  }

  getApplicantProfileById(id:number){
    return this.http.get(this.baseUrl + "applicant/" + id + "/profile");
  }

  getNAGPStatusValues() {
    return this.http.get(this.baseUrl + 'constants/nagp_status')
  }

}
