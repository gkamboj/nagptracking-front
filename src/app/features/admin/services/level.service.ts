import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/admin/level';
  baseUrlwithProxy: string = 'admin/level';
  baseUrlHosted: string = ''
  getAllLevels() {
    return this.http.get(this.baseUrl);
  }
  getLevelByid(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }
  editLevel(id, bodyToSend){
    return this.http.put(this.baseUrl + "/" + id, bodyToSend);
  }
  addLevel(levelToAdd) {
    return this.http.post(this.baseUrl, levelToAdd);
  }
}
