import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Certificate } from '../models/certificate.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8080/api'

  addCertificate(certificate: Certificate): Observable<any>{
    return this.http.post(this.url + "/add-certificate", certificate);
  }

  deleteCertificate(username: string, certificateId: string){
    return this.http.delete(this.url + "/delete-certificate/" + username + "/" + certificateId);
  }

  updateCertificate(certificate: Certificate){
    this.http.put(this.url + "/update-certificate", certificate);
  }
}
