import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { NodeService } from '../../services/Nodeservice'; 
import { HomeNodeService }  from '../../services/HomeNodeService'; 

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss']
})
export class BuyProductComponent implements OnInit {
  stateList: any = [];
  countyList: any = [];
  citiesList: any = [];
  // categoryList = [{cname:'Accounting & Finance'},{cname:'Construction',scname:'Architect'},
  //                 {cname:'Construction',scname:'Landscape'},{cname:'Construction',scname:'Surveyor'},
  //                 {cname:'Construction',scname:'Contractor'},{cname:'Construction',scname:'Engineer'},
  //                 {cname:'Human Resources'},{cname:'Information Technology',scname:'Cybersecurity'},
  //                 {cname:'Information Technology',scname:'Software development'},{cname:'Information Technology',scname:'IT Support'},
  //                 {cname:'Information Technology',scname:'Systems analyst'},{cname:'Legal'},{cname:'Logistics & Transportation'},
  //                 {cname:'Marketing, Advertising & Promotions'},{cname:'Real Estate',scname:'Commercial'},
  //                 {cname:'Real Estate',scname:'Residential'},{cname:'Real Estate',scname:'Property Management'},
  //                 {cname:'Telecommunications & Cable'},]  
  
  categoryList=['Furniture','Cleaning & Organization','Kitchen','Dining & Entertainment',
                'Bed & Bath','Electronics',' Home Goods', 'Office & Stationary','Website Design',];
  emailTo: any;
  submitted= false;
  constructor(private user: NodeService, public router: Router ,public home:HomeNodeService ) { }

  ngOnInit() {
    this.home.getStateList().subscribe(
      data => {
            this.stateList = data;
            this.home.getCountyList().subscribe(
              data => {
                    this.countyList = data;
              });
      });
      
  } 
  
  changeState($event) {
    if ($event == undefined) { this.citiesList = []; 
    } else { this.citiesList = this.countyList.filter((item) => { return item.state_code === $event.state_code; }); }
   }
 
  
  
}
