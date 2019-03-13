import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { NodeService } from "../../services/Nodeservice";
import { LandlordService } from '../../services/landlord.service';

@Component({
  selector: 'app-landlord-list',
  templateUrl: './landlord-list.component.html',
  styleUrls: ['./landlord-list.component.scss']
})
export class LandlordListComponent implements OnInit {

  public publishModal;
  public hideModal;
  public deleteModal;
  public viewModal;

  Data: any;
  list: any;
  user_name: any;
  user_id: any;
  isList = true;
  id_view: any;
  id_edit: any;
  id_hide: any;
  id_publish: any;

  constructor(private user: NodeService, public router: Router, private landlord:LandlordService) {}
  ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
      }
    }

    this.landlord.getLeaseByUserID(this.user_id).subscribe(
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
          alert("No Data");
        }
      },
      error => {
        alert("Server Error");
      }
    );
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

  edit(value) {
    this.router.navigate(["/form/landlord-register"], { queryParams: { biz_id: value } });
  }

  view(value) {
    this.router.navigate(["/lease/lease-detail"], { queryParams: { biz_id: value } });
  }

  hide(value) {
    // let id = { com_id: value };
    // this.user.hideProduct(id).subscribe(
    //   data => {
    //     this.Data = data;
    //     if (this.Data == 1) {
    //       this.router.navigate(["/home/buy"]);
    //     } else {
    //       alert("No Data");
    //     }
    //   },
    //   error => {
    //     alert("Server Error" + error);
    //   }
    // );
  }

  publish(value) {
    // let id = { com_id: value };
    // this.user.publishProduct(id).subscribe(
    //   data => {
    //     this.Data = data;
    //     if (this.Data == 1) {
    //       this.router.navigate(["/home/buy"]);
    //     } else {
    //       alert("No Data");
    //     }
    //   },
    //   error => {
    //     alert("Server Error" + error);
    //   }
    // );
  }

}
