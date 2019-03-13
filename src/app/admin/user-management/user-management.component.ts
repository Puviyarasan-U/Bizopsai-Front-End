import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ItemsList } from '@ng-select/ng-select/ng-select/items-list';
import { isNgTemplate } from '@angular/compiler';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  allUsers: any = [];
  notificationId:any;
  usersData: any = [];
  allBuyers: any = [];
  buyersData: any = [];
  allProfessionals: any = [];
  professionalsData: any = [];
  allSellers:any=[];
  allSellersID:any=[];
  sellersData:any=[];
  currentUserType:any;
  user_request:any;
  p:any;
  id_view: any;
  id_edit: any;
  id_hide: any;
  id_publish: any;
  notifyResponse:any=[];
  user_name:any;
  user_id:any;
  usersTypes = ['All', 'Buyer', 'Seller', 'Professional'];
  constructor(private admin: AdminService,private router : Router) { }
  ngOnInit() {
    if(sessionStorage.length){
      if(sessionStorage.getItem('Bizops_User')){
        let userdata = JSON.parse(sessionStorage.getItem('Bizops_User'));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
      }        
    }
    this.admin.getAllUser().subscribe(data => {
      this.allUsers = data; this.usersData = data;
      this.admin.getAllBuyers().subscribe(data => {
        this.allBuyers = data;
        this.admin.getAllProfessionals().subscribe(data => {
          this.allProfessionals = data;
          this.admin.getAllBusiness().subscribe(data => { 
          this.allSellers = data; 
          this.admin.getAllSellers().subscribe(data => { 
            this.allSellersID = data; 
            });
          });
        });
      });
    });
  }
  onSearchChange(searchValue) {
    if (searchValue == '') {
      this.allUsers = this.usersData;
    }
    else {
      this.allUsers = this.usersData.filter((item) => {
        return item.USER_FIRSTNAME === searchValue;
      });
    }
  }
  changeUserType(event) {
    this.allUsers = this.usersData;
    // this.allBuyers = this.allBuyers;
    console.log(event);
    if (event == 'Buyer') {
      for(var i = 0; i < this.allBuyers.length; i++) {
        for(var j=0;j<this.usersData.length;j++){
          if(this.allBuyers[i].USER_ID == this.usersData[j].ID){
            this.buyersData.push(this.usersData[j]);
            this.allUsers = this.buyersData;
          }
        }    
      }     
    }else if(event == 'Seller'){
      for(var i = 0; i < this.allSellersID.length; i++) {
        for(var j=0;j<this.usersData.length;j++){
          if(this.allSellersID[i].USER_ID == this.usersData[j].ID){
            this.sellersData.push(this.usersData[j]);
            this.allUsers = this.sellersData;
          }
        }    
      }
    }else if(event == 'Professional'){
      for(var i = 0; i < this.allProfessionals.length; i++) {
        for(var j=0;j<this.usersData.length;j++){
          if(this.allProfessionals[i].USER_ID == this.usersData[j].ID){
            this.professionalsData.push(this.usersData[j]);
            this.allUsers = this.professionalsData;
          }
        }    
      }
    }else{
      return this.allUsers;
    }
  }
  viewId(id) {
    this.id_view = id;
  }
  editId(id) {
    this.id_edit = id;
  }
  hideId(id) {
    this.id_hide = id;
  }
  publishId(id) {
    this.id_publish = id;
  } 
  notifyId(id){
    this.notificationId = id;
  }
  // hide(value) {
  //   let id = { com_id: value }
  //   this.user.hideProduct(id).subscribe(
  //     data => {

  //       this.Data = data;
  //       if (this.Data == 1) {
  //         this.router.navigate(['/buy']);
  //       } else {
  //         alert('No Data');
  //       }
  //     },
  //     error => {
  //       alert('Server Error' + error);
  //     });
  // }
  notify(value){
   console.log(value);
   this.router.navigate(['/tran/map'], { queryParams: { user_id: value } });
   
  }
  view(value){

  }
  edit(value){

  }
  hide(value){

  }
  publish(value){
    
  }

}
