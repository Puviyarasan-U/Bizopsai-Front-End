import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NodeService } from '../../services/Nodeservice';
import { Router } from '@angular/router';
@Component({
  selector: 'app-business-management',
  templateUrl: './business-management.component.html',
  styleUrls: ['./business-management.component.scss']
})
export class BusinessManagementComponent implements OnInit {
  allBusiness: any = [];
  user_request:any;
  p:any;
  BusinessData: any = [];
  id_view: any;
  id_edit: any;
  id_hide: any;
  id_publish: any;
  Data: any;
  values: any;
  user_name:any;
  user_id:any;
  constructor(private admin: AdminService, private router: Router, private user: NodeService) { }
  ngOnInit() {
    if(sessionStorage.length){
      if(sessionStorage.getItem('Bizops_User')){
        let userdata = JSON.parse(sessionStorage.getItem('Bizops_User'));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
      }        
    }
    this.admin.getAllBusiness().subscribe(data => { this.allBusiness = data; this.BusinessData = data });
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
  view(value) {
    this.router.navigate(['/home/detail'], { queryParams: { com_id: value } });
  }

  hide(value) {
    let id = { com_id: value }
    this.user.hideProduct(id).subscribe(
      data => {

        this.Data = data;
        if (this.Data == 1) {
          this.router.navigate(['/home/buy']);
        } else {
          alert('No Data');
        }
      },
      error => {
        alert('Server Error' + error);
      });
  }


  publish(value) {

    let id = { com_id: value }
    this.user.publishProduct(id).subscribe(
      data => {
        this.Data = data;
        if (this.Data == 1) {
          this.router.navigate(['/home/buy']);
        } else {
          alert('No Data');
        }
      },
      error => {
        alert('Server Error' + error);
      });
  }
  onSearchChange(searchValue) {
    if (searchValue == '') {
      this.allBusiness = this.BusinessData;    }
    else{
      this.allBusiness = this.BusinessData.filter((item) => {
        return item.STATE.toLowerCase() === searchValue.toLowerCase();
      });
    }
  }
  edit(value){

  }
}
