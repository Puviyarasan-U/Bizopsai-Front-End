import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class MailService {

  apiRoot = 'http://localhost:3010';
  constructor(private http: Http) { }

  userVeriication(detail) {
    const url = `${this.apiRoot}/api/mail/user-verify`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }

  forgetPassword(mail){
    const url = `${this.apiRoot}/api/mail/forgot-password/`+ mail
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  
  updateUserPassword(detail){
    const url = `${this.apiRoot}/api/mail/reset-password`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }

  requestProfessionalMail(mail){
    const url = `${this.apiRoot}/api/mail/request-professional/`+ mail
    return this.http.get(url)
      .map((res: Response) => res.json());
 }

}