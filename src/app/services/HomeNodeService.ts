import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeNodeService {

  // apiRoot: string = "http://157.56.179.20:3010";
  apiRoot = 'http://localhost:3010';

  constructor (private http: Http) {}

  getBaseCategory() {
    const url = `${this.apiRoot}/api/home/getCategory`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getChildCategory() {
    const url = `${this.apiRoot}/api/home/getSubCategory`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getSubchildCategory() {
    const url = `${this.apiRoot}/api/home/getSubchildCategory`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getProductList() {
    const url = `${this.apiRoot}/api/home/getProduct`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getStateList() {
    const url = `${this.apiRoot}/api/home/getState`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getCountyList() {
    const url = `${this.apiRoot}/api/home/getCounty`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getBuildingTypes() {
    const url = `${this.apiRoot}/api/home/getBuildingTypes`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getBuildingSubTypes() {
    const url = `${this.apiRoot}/api/home/getBuildingSubTypes`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  
  getProcessMstr() {
    const url = `${this.apiRoot}/api/home/getProcessMstr`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getLeaseList(){
    let url =`${this.apiRoot}/api/home/getLease`
    return this.http.get(url)
      .map((res:Response) => res.json());
  }
  getProfessionalList() {
    const url = `${this.apiRoot}/api/home/getProfessionals`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getInstructionList() {
    const url = `${this.apiRoot}/api/getInstructionList`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getBusChecklist(){
    const url = `${this.apiRoot}/api/getBusChecklistDoc`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  saveList(details) {
    const url = `${this.apiRoot}/api/user/savelist`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }

  getMaxListId() {
    const url = `${this.apiRoot}/api/home/getMaxListId`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getListByTranId(data) {
    //console.log(id)
    const url = `${this.apiRoot}/api/home/getListByTranId`
    return this.http.post(url,data)
      .map((res: Response) => res.json());
  }  

  getUserRequests(id) {  
    const url = `${this.apiRoot}/api/home/getUserRequests/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  
  getProfessional(id) {  
    const url = `${this.apiRoot}/api/home/getProfessional/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  
  acceptRequest(data) {
    //console.log(id)
    const url = `${this.apiRoot}/api/home/acceptRequest`
    return this.http.post(url,data)
      .map((res: Response) => res.json());
  }
  
  getTransactions(id) {  
    const url = `${this.apiRoot}/api/home/getTransactions/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getTransBusiness(id) {  
    const url = `${this.apiRoot}/api/home/getTransBusiness/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  
  requestDataroom(detail) {  
    const url = `${this.apiRoot}/api/home/requestDataroom` 
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }

  acceptDataroom(detail) {  
    const url = `${this.apiRoot}/api/home/acceptDataroom`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }

  getDataRoomRequest(id) {  
    const url = `${this.apiRoot}/api/home/getDataRoomRequest/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }



}
