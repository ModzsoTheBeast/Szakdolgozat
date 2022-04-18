import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendEmail(user: emailDetailsDTO) {
    return this.http.post<emailDetailsDTO>(
      `${environment.apiUrl}/api/email/send`,
      user
    );
  }
}

export interface emailDetailsDTO {
  projectId: number;
  fromEmail: string;
  toEmail: string;
}
