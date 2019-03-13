import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
@Injectable()
export class AdminService {
  apiRoot = 'http://localhost:3010';
  constructor(private http: Http) { }
  getAllBusiness() {
    const url = `${this.apiRoot}/api/admin/allBusiness`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }  
  getAllUser() {
    const url = `${this.apiRoot}/api/admin/allUser`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }  
  getAllProfessionals() {
    const url = `${this.apiRoot}/api/admin/allProfessionals`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getAllBuyers() {
    const url = `${this.apiRoot}/api/admin/allBuyers`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  createBizAdmin(detail) {
    const url = `${this.apiRoot}/api/admin/createBizAdmin`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }
  getBizAdmin() {
    const url = `${this.apiRoot}/api/admin/getBizAdmin`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  sendNotification(detail) {
    const url = `${this.apiRoot}/api/admin/sendNotification`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }
  getNotification() {
    const url = `${this.apiRoot}/api/admin/getNotification`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }  
  getBuyerNotification() {
    const url = `${this.apiRoot}/api/admin/getBuyerNotification`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getSellerNotification() {
    const url = `${this.apiRoot}/api/admin/getSellerNotification`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getProfessionalNotification() {
    const url = `${this.apiRoot}/api/admin/getProfessionalNotification`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getAdmin() {
    const url = `${this.apiRoot}/api/admin/getAdmin`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getAllSellers() {
    const url = `${this.apiRoot}/api/admin/allSellers`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
}
