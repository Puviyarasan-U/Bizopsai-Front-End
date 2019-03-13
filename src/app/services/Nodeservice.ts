import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
//import { ILogin } from '../interface/login';

@Injectable()
export class NodeService {

  // apiRoot: string = "http://157.56.179.20:3010";
  apiRoot = 'http://localhost:3010';

  constructor (private http: Http) {}

  login(data) {
    const url = `${this.apiRoot}/api/login`
    return this.http.post(url, data)
      .map((res: Response) => res.json());
  }

  checkFirstUser(id){
    const url = `${this.apiRoot}/api/checkFirstUser/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getBizbyUser(id) {
    const url = `${this.apiRoot}/api/getBiz/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getProfbyId(id) {
    const url = `${this.apiRoot}/api/getprofessional/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getSavedList(id){
    const url = `${this.apiRoot}/api/getSavedList/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getBuyerInterestList(id){
    const url = `${this.apiRoot}/api/user/buyerInterestList/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  professionalTransaction(id){
    const url = `${this.apiRoot}/api/user/professionalTransaction/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  profTranBuyer(id){
    const url = `${this.apiRoot}/api/user/profTranBuyer/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getBizbyid(id) {
    const url = `${this.apiRoot}/api/getUserBiz/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  } 
  

  publishProduct(id) {
    const url = `${this.apiRoot}/api/publishProduct/`
    return this.http.put(url, id)
      .map((res: Response) => res.json());
  }

  hideProduct(id) {
    const url = `${this.apiRoot}/api/hideProduct/`
    return this.http.put(url, id)
      .map((res: Response) => res.json());
  }

  getBiz() {
    const url = `${this.apiRoot}/api/getBiz`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getImage(id) {
    const url = `${this.apiRoot}/api/getImage/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  createUser(details) {
    const url = `${this.apiRoot}/api/createUser`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }

  createProfessional(details) {
    const url = `${this.apiRoot}/api/createProfessional`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }

  createBiz(details) {
    const url = `${this.apiRoot}/api/createBiz`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }
  createEquip(details) {
    console.log(details)
    const url = `${this.apiRoot}/api/createEquip`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }

  insertimage(companyid) {
    console.log(companyid)
    const url = `${this.apiRoot}/api/insertimage`
    return this.http.post(url, companyid)
      .map((res: Response) => res.json());
  }

  getUserList() {
    const url = `${this.apiRoot}/api/getUserlist`
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  uploadImage(image): Observable<any[]> {
  //  let url='./app/config.json';
     return this.http.post('./assets/', image)
      .map((res: Response) => {
        return <any[] > res.json();
      });
    }

    deleteSecImages(id) {
      const url = `${this.apiRoot}/api/upload/deleteSecImages/` + id
      return this.http.delete(url)
        .map((res: Response) => res.json());
    }

    removeSavedList(detail){
      const url = `${this.apiRoot}/api/user/removeSavedList`
      return this.http.post(url,detail)
        .map((res: Response) => res.json());
    }

    sendMail(detail) {      
      const url = `${this.apiRoot}/api/mail` 
      return this.http.post(url,detail)
        .map((res: Response) => res.json());
    }
    // verifyEmail(companyid) {
    //   console.log(companyid)
    //   const url = `${this.apiRoot}/api/verifyEmail/` + companyid
    //   return this.http.get(url)
    //     .map((res: Response) => res.json());
    // }
    aflag(aflag) {
      console.log(aflag)
      const url = `${this.apiRoot}/api/flag/` + aflag
      return this.http.get(url)
        .map((res: Response) => res.json());
    }
    changeflag(id) {
      console.log(id)
      const url = `${this.apiRoot}/api/flagid/` + id
      return this.http.get(url)
        .map((res: Response) => res.json());
    }
    // EquipData(data) {
    //   let url =`${this.apiRoot}/api/equipdata`
    //   return this.http.post(url,data)
    //     .map((res:Response) => res.json());
    // }
    getconfig():Observable<any[]>{
   // let url='./app/config.json';
     return this.http.get('./assets/config/man1.json')
      .map((res:Response) => {  
        return <any[] > res.json();
      });
    }

    createInstruction(details) {
      console.log(details)
      const url = `${this.apiRoot}/api/createInstruction`
      return this.http.post(url, details)
        .map((res: Response) => res.json());
    }

    createChecklist(details) {
      console.log(details)
      const url = `${this.apiRoot}/api/createChecklist`
      return this.http.post(url, details)
        .map((res: Response) => res.json());
    }

    createBusinessChecklist(details) {
      console.log(details)
      const url = `${this.apiRoot}/api/createBusinessChecklist`
      return this.http.post(url, details)
        .map((res: Response) => res.json());
    }

    

    hireProfessional(details) {
      console.log(details)
      const url = `${this.apiRoot}/api/home/hireProfessional`
      return this.http.post(url, details)
        .map((res: Response) => res.json());
    }

    updateProfessional(details){
      console.log(details)
      const url = `${this.apiRoot}/api/home/updateProfessional`
      return this.http.post(url, details)
        .map((res: Response) => res.json());
    }

    removeProfessional(details){     
      const url = `${this.apiRoot}/api/home/removeProfessional`
      return this.http.post(url, details)
        .map((res: Response) => res.json());
    }

    hireBizProf(details) {      
      const url = `${this.apiRoot}/api/service/hireBizProf`
      return this.http.post(url, details)
        .map((res: Response) => res.json());
    }

    updateBizProf(details){      
      const url = `${this.apiRoot}/api/service/updateBizProf`
      return this.http.post(url, details)
        .map((res: Response) => res.json());
    }

    removeBizProf(details){     
      const url = `${this.apiRoot}/api/service/removeBizProf`
      return this.http.post(url, details)
        .map((res: Response) => res.json());
    }

    sellerPrincipleAgent(details){
      const url = `${this.apiRoot}/api/service/sellerPrincipleAgent`
      return this.http.post(url, details)
        .map((res: Response) => res.json());
    }
    
    buyerPrincipleAgent(details){
      const url = `${this.apiRoot}/api/service/buyerPrincipleAgent`
      return this.http.post(url, details)
        .map((res: Response) => res.json());
    }


    getServices(details){     
      const url = `${this.apiRoot}/api/home/getServices`
      return this.http.post(url, details)
        .map((res: Response) => res.json());
    }

    getBizServices(details){
      const url = `${this.apiRoot}/api/service/getBizServices`
      return this.http.post(url, details)
        .map((res: Response) => res.json());
    }




}
