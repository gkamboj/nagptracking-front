import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ActivityrecordsService {

  constructor(
    private http: HttpClient
  ) { }
  baseUrl: string = 'http://localhost:8080';
  baseUrlWithProxy: string = 'applicant_activity';
  baseUrlNetwork: string = '';

  addRecord(recordToAdd) {
    return this.http.post(this.baseUrl + "/admin/" + "applicant_activity", recordToAdd);
  }
  getAllRecords() {
    return this.http.get(this.baseUrl + "/admin/" + "applicant_activity");
  }

  getAllRecordsByApplicantId(id:number){
    return this.http.get(this.baseUrl + "/admin/applicant/" + id + "/applicant_activity");
  }

  getRecordById(id: number) {
    return this.http.get(this.baseUrl + "/admin/applicant_activity/" + id);
  }

  editRecord(id, bodyToSend) {
    return this.http.put(this.baseUrl + "/admin/applicant_activity/" + id, bodyToSend);
  }

  editRecordByApplicant(id, bodyToSend) {
    return this.http.put(this.baseUrl + "/applicant/applicant_activity/" + id, bodyToSend);
  }

  deleteRecord(id) {
    return this.http.delete(this.baseUrl + "/admin/applicant_activity/" + id);
  }

  getActivityStatusValues() {
    return this.http.get(this.baseUrl + '/constants/activity_status');
  }
}
