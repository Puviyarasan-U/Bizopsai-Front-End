import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class ProcessService {

  apiRoot = 'http://localhost:3010';
  constructor(private http: Http) { }

  createBusinessProcess(details) {   
    const url = `${this.apiRoot}/api/process/createBusinessProcess`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }

  deleteProcess(id) {
    const url = `${this.apiRoot}/api/process/deleteProcess/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getProcessbyCmp(id) {
    const url = `${this.apiRoot}/api/getProcessbyCmp/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  updateBuyerProcess(detail){
    const url = `${this.apiRoot}/api/process/updateBuyerProcess` 
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }

  getProcessbyTran(detail){
    const url = `${this.apiRoot}/api/process/getProcessbyTran` 
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }
  
  deleteProcessbyTran(detail){
    const url = `${this.apiRoot}/api/process/deleteProcessbyTran` 
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }

  putOfferPrice(detail){
    const url = `${this.apiRoot}/api/process/putOfferPrice` 
    return this.http.put(url,detail)
      .map((res: Response) => res.json());
  }


  getProfSellerList(id){
    const url = `${this.apiRoot}/api/professional/getProfSellerList/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getProfBuyerList(id){
    const url = `${this.apiRoot}/api/professional/getProfBuyerList/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  
  getDetailsbyTran(detail){
    const url = `${this.apiRoot}/api/professional/getDetailsbyTran` 
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }

  getNDA(id){
    const url = `${this.apiRoot}/api/professional/getNDA/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

}