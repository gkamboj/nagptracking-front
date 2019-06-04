import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private http: HttpClient
    ) { }
  baseUrl: string = 'http://localhost:8080/admin/activity';
  baseUrlWithProxy: string = 'admin/activity';
  baseUrlNetwork: string = '';
  addActivity(activityToAdd) {
    return this.http.post(this.baseUrl, activityToAdd);
  }
  getAllActivities() {
    return this.http.get(this.baseUrl);
  }
  getActivityById(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }
  editActivity(id, bodyToSend) {
    return this.http.put(this.baseUrl + "/" + id, bodyToSend);
  }

  deleteActivity(id) {
    return this.http.delete(this.baseUrl + id);
  }

  getActivityForLevelAndBatch(id: number){
    return this.http.get(this.baseUrl + "/eligible/" + id);
  }
}
