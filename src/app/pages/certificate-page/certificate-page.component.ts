import { Component } from '@angular/core';
import { Certificate } from '../../models/certificate.model';
import { CommonModule } from '@angular/common';
import { CertificateService } from '../../service/certificate.service';

@Component({
  selector: 'app-certificate-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificate-page.component.html',
  styleUrl: './certificate-page.component.css',
})
export class CertificatePageComponent {
  certificate: Certificate | undefined;

  username: string = '';
  certificateId: string = '';

  constructor(private certificateService: CertificateService) {}

  onUsernameChange(event: any) {
    this.username = event.target.value;
  }

  onCertificateIdChange(event: any) {
    this.certificateId = event.target.value;
  }

  getCertificate() {
    this.certificateService
      .getCertificate(this.username, this.certificateId)
      .subscribe((certificate) => {
        this.certificate = certificate;
        console.log(certificate);
        
      });
  }
}
