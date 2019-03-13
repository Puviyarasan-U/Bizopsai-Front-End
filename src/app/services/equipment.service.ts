import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
@Injectable()
export class EquipmentService {
  apiRoot = 'http://localhost:3010';
  constructor(private http: Http) { }
  getEquip(id) {
    console.log(id)
    const url = `${this.apiRoot}/api/home/getEquipments/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  deleteEquip(id) {
    const url = `${this.apiRoot}/api/home/deleteEquipments/` + id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  createEquip(details) {
    console.log(details)
    const url = `${this.apiRoot}/api/createEquip`
    return this.http.post(url, details)
      .map((res: Response) => res.json());
  }
}
