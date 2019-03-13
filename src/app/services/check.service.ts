import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
@Injectable()
export class CheckService {
  apiRoot = 'http://64.79.74.156:3001/servers/';
  constructor(private http: Http) { }
  
  checkURL(){   
    const url = `http://64.79.74.156:3001/servers/connect/5e27395a-14cb-4eed-87d7-93576eaca771`
    return this.http.get(url)
    .map((res: Response) => res.json());     
  } 

  createServer(datails){
    const url = `http://64.79.74.156:3001/servers/`
    return this.http.post(url,datails)
    .map((res: Response) => res.json()); 
  }

}