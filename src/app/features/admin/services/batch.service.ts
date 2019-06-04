import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BatchService {
  baseUrl: string = 'http://localhost:8080/admin/batch';
  baseUrlwithProxy: string = 'admin/batch';
  baseUrlHosted: string = ''
  constructor(private http: HttpClient) { }
  getAllBatches() {
    return this.http.get(this.baseUrl);
  }
  getBatchByid(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }
  editBatch(id,bodyToSend){
    return this.http.put(this.baseUrl + "/" + id, bodyToSend);
  }
  addBatch(batchToAdd) {
    return this.http.post(this.baseUrl, batchToAdd);
  }
  getBatchTechnologies() {
    return this.http.get('http://localhost:8080/constants/batch_technologies');
  }
}
