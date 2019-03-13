import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';  

import { HomeNodeService } from '../../services/HomeNodeService';
import { NodeService } from '../../services/Nodeservice';
import { ProcessService } from '../../services/process.service';
import { DataroomService } from '../../services/dataroom.service';

@Component({
  selector: 'app-main-data-room',
  templateUrl: './main-data-room.component.html',
  styleUrls: ['./main-data-room.component.scss']
})
export class MainDataRoomComponent implements OnInit {

  agentType = [{name:'Buyer Agent',value:'Buyer'},{name:'Seller Agent', value:'Seller'}];    
  user_name: any;
  user_id: any;
  user_role: string;
  isSeller = false;
  isBuyer = false;
  isProfessional = false;
  prof_id: any;

  com_id: any;
  list: any;
  isBusinessSelected = false;
  personalInfoData = [];
  isNoPersonalData = false;
  isBuyerFinancial = false;
  isBuyerBank = false;
  isBuyerLicense = false;
  DOC_MSTR: any;

  buyerDataroom = false;
  

  constructor( private home: HomeNodeService, private process: ProcessService, 
               private dataroom:DataroomService,
               private user: NodeService, private router: Router,) { } 

  ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
       // this.isUser = true;
      }
    }
    this.user.checkFirstUser(this.user_id).subscribe(
      userType=>{
        var res = userType;       
          if(res[0].ID == 1){ //seller
            this.user.getBizbyUser(this.user_id).subscribe(
              data => {
                var res = data;
                this.isSeller = true;
                let rows = res;
                if (rows.length > 0) {
                  if (rows[0].status) {
                   //this.isList = false;
                  }
                  else {
                  this.list = rows;
                  this.com_id = this.list[0].COMPANY_ID;
                  this.onBusinessChange(); 
                  }
                }
                else {
                  alert('No Data');
                }
              },
              error => {
                alert('Server Error');
              });
          } 
          else if(res[0].ID == 2){ //buyer
            this.home.getTransactions(this.user_id).subscribe(
              data => {
                var res = data;
                this.isBuyer = true;
                if (res.length > 0) {
                  if (res[0].status) {
           //         this.isList = false;           
                  }
                  else {
                     this.buyerDataroom = true;
                     this.list = res;
                     //this.com_id = this.list[0].COMPANY_ID;
                     //this.onBusinessChange();          
                  }
                }    
                this.dataroom.getBuyerInfo(this.user_id).subscribe( 
                  personalInfo=>{
                    var res = personalInfo;
                    if (res.length > 0) {
                      if (res[0].status) {
                          this.isNoPersonalData = true;
                      } else {
                        this.personalInfoData = res; 
                      }
                    }
                  });    
              });
          }
          else if(res[0].ID == 3){  //professional
            this.home.getProfessionalList().subscribe(data => {
              var professional_Mstr = data;
              var checkProfessional = professional_Mstr.filter(item => {
                return item.USER_ID == this.user_id;
              });
              if (checkProfessional.length > 0) {
                this.isProfessional = true;
                this.prof_id = checkProfessional[0].ID;
                this.user_role = "Seller";
                this.onRoleChange();
              } else {
                this.isProfessional = false;
              }
            });           
          }     
      });
  }
  onRoleChange() {   
    if (this.user_role == "Buyer") {  
      this.isSeller = false;
      this.process.getProfBuyerList(this.prof_id).subscribe(profBuyerData=>{
        var res = profBuyerData;
           if (res.length > 0) {
          if (res[0].status) {
          } else {
            this.list = res;     
            this.com_id = this.list[0].COMPANY_ID;     
            this.onBusinessChange();        

          }
        } else {
          alert("No Data");
        }
      });
    } 
    else if (this.user_role == "Seller") {    
      this.isSeller = true;
      this.process.getProfSellerList(this.prof_id).subscribe(profSellerData=>{
        var res = profSellerData;
           if (res.length > 0) {
          if (res[0].status) {
          } else {
            var filterdList = _.uniqBy(res, 'COMPANY_ID'); 
            this.list = filterdList;
            this.com_id = this.list[0].COMPANY_ID; 
            this.onBusinessChange();        
          }
        } else {
          alert("No Data");
        }
      });
    }
  }

  onBusinessChange(){   
    this.isBusinessSelected = false;
    if(this.com_id){
      this.isBusinessSelected = true;
      this.home.getTransBusiness(this.com_id).subscribe(
        data => {
          var res = data;
          if (res.length > 0) {
            if (res[0].status) {
            } else {
              this.DOC_MSTR = data;               
            }
          }
       });
    }
  }

  editBusiness(){
    this.router.navigate(['/seller/edit'], { queryParams: { com_id: this.com_id } });
  }

  showBuyerLicense(){    
    if(this.personalInfoData[0].LICENSE_REPORT){
      this.isBuyerLicense = true;
    } else {
      alert('No Document Found, Contact Seller');
    }
  }

  showBuyerBank(){    
    if(this.personalInfoData[0].BANK_REPORT){
      this.isBuyerBank = true;
    } else {
      alert('No Document Found, Contact Seller');
    }
  }

  showBuyerFinancial(){    
    if(this.personalInfoData[0].FIN_REPORT){
      this.isBuyerFinancial = true;
    } else {
      alert('No Document Found, Contact Seller');
    }
  }

}
