import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
@Injectable()
export class BuyerService {
  apiRoot = 'http://localhost:3010';
  
  constructor(private http: Http) { }

  buyerBiz(details){   
    const url = `${this.apiRoot}/api/buyerBiz`
    return this.http.post(url,details)
    .map((res: Response) => res.json());     
  } 
  getBuyerID(id) {   
    const url = `${this.apiRoot}/api/buyerID/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getSaveID(id) {   
    const url = `${this.apiRoot}/api/saveID/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }  
  saveBusiness_bySeller(id) {   
    const url = `${this.apiRoot}/api/sellerSave/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getBuyerDetail(id){
    const url = `${this.apiRoot}/api/getBuyerDetail/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());

  }

  checkBusiness(details){   
    const url = `${this.apiRoot}/api/checkBusiness`
    return this.http.post(url,details)
    .map((res: Response) => res.json());     
  }
  alreadySaved(details){   
    const url = `${this.apiRoot}/api/alreadySaved`
    return this.http.post(url,details)
    .map((res: Response) => res.json());     
  }
  getBuy_ID(id) {
    const url = `${this.apiRoot}/api/getBuy_ID/`+id
    return this.http.get(url)
      .map((res: Response) => res.json());
  } 
}
