import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NodeService } from '../../services/Nodeservice';
import { LandlordService } from '../../services/landlord.service';


@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})
export class TenantListComponent implements OnInit {

  p:any;
  Data: any;
  list: any;
  user_name: any;
  user_id: any;
  isList = true;

  constructor( private user: NodeService, public router: Router, private landlord:LandlordService) {  }

  ngOnInit() {

    if(sessionStorage.length){
      if(sessionStorage.getItem('Bizops_User')){
        let userdata = JSON.parse(sessionStorage.getItem('Bizops_User'));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
      }        
    }

    this.landlord.getTenantLeaseList(this.user_id).subscribe(
      data => {
      
            this.Data = data;
            let rows = this.Data;
            if (rows.length > 0) {
              if (rows[0].status) {
                    this.isList = false;
                 } else {
                  this.list = rows;
                }
             } else {
                 alert('No Data');
             }
       },
      error => {
          alert('Server Error');
       });
  }
  
  detail(value) {
    this.router.navigate(['/lease/lease-detail'], { queryParams: { biz_id: value } });
  }

  remove(value){
    let detail={
      user_id: this.user_id,
      com_id: value
    }
    this.user.removeSavedList(detail).subscribe(
      data => {
       if(data>0){
        alert('Removed Successfully !!!');
        this.ngOnInit();
        }    
    })

  }

}
