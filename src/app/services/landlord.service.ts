import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class LandlordService {

  apiRoot = 'http://localhost:3010';
  constructor(private http: Http) { }

  insertPersonalInfo(detail) {
    const url = `${this.apiRoot}/api/lease/personal-info`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }

  insertBusinessEntity(detail) {
    const url = `${this.apiRoot}/api/lease/business-entity`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }

  insertBuildingInfo(detail) {
    const url = `${this.apiRoot}/api/lease/building-info`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }

  insertPremisesInfo(detail) {
    const url = `${this.apiRoot}/api/lease/premises-info`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }
  insertLeaseTerms(detail){
    const url = `${this.apiRoot}/api/lease/lease-terms`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }

  getLeaseByUserID(id){
    const url = `${this.apiRoot}/api/lease/getlist-user/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  saveLeaseList(detail){
    const url = `${this.apiRoot}/api/tenant/saveLeaseList`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }
  
  getLeaseSecImages(id){
    const url = `${this.apiRoot}/api/lease/getSecImages/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getLeaseType(id){
    const url = `${this.apiRoot}/api/lease/getLeaseType/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getTenantInterestList(id){
    const url = `${this.apiRoot}/api/lease/getTenantInterestList/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  
  getTenantLeaseList(id){
    const url = `${this.apiRoot}/api/lease/getTenantLeaseList/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  checkExistingTenant(id){
    const url = `${this.apiRoot}/api/lease/check-isexisting-tenant/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  checkAlreadySaved(id){
    const url = `${this.apiRoot}/api/lease/checkAlreadySaved/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getProfLandlordList(id){
    const url = `${this.apiRoot}/api/lease/getProfLandlordList/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  
  getProfTenantList(id){
    const url = `${this.apiRoot}/api/lease/getProfTenantList/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getDetailsbyLeaseTran(detail){
    const url = `${this.apiRoot}/api/lease/getDetailsbyLeaseTran`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }




}