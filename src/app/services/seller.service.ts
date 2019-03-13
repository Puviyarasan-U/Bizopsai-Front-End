import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class SellerService {
  apiRoot = 'http://localhost:3010';
  constructor(private http: Http) { }
  getBizbyid(id) {
    const url = `${this.apiRoot}/api/getUserBiz/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getImage(id) {
    const url = `${this.apiRoot}/api/getImage/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  createBiz(details) {
    const url = `${this.apiRoot}/api/createBiz`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }
}
