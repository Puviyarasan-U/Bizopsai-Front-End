import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class DataroomService {

  apiRoot = 'http://localhost:3010';
  constructor(private http: Http) { }

  getPersonalInfo(id) {
    const url = `${this.apiRoot}/api/dataroom/getPersonalInfo/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getBusinessInfo(id) {
    const url = `${this.apiRoot}/api/dataroom/getBusinessInfo/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getBuildingInfo(id) {
    const url = `${this.apiRoot}/api/dataroom/getBuildingInfo/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getPremisesInfo(id) {
    const url = `${this.apiRoot}/api/dataroom/getPremisesInfo/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getFinancialInfo(id) {
    const url = `${this.apiRoot}/api/dataroom/getFinancialInfo/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  getBuyerInfo(id) {
    const url = `${this.apiRoot}/api/dataroom/getBuyerInfo/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

}