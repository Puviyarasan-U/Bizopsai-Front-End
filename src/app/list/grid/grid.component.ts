import { Component, OnInit } from "@angular/core";
import { NodeService } from "../../services/Nodeservice";
import { Router } from "@angular/router";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"]
})
export class GridComponent implements OnInit {
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

  constructor(private user: NodeService, public router: Router) {}
  ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
      }
    }

    this.user.getBizbyUser(this.user_id).subscribe(
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
    this.router.navigate(["/seller/edit"], { queryParams: { com_id: value } });
  }

  view(value) {
    this.router.navigate(["/home/detail"], { queryParams: { com_id: value } });
  }

  hide(value) {
    let id = { com_id: value };
    this.user.hideProduct(id).subscribe(
      data => {
        this.Data = data;
        if (this.Data == 1) {
          this.router.navigate(["/home/buy"]);
        } else {
          alert("No Data");
        }
      },
      error => {
        alert("Server Error" + error);
      }
    );
  }

  publish(value) {
    let id = { com_id: value };
    this.user.publishProduct(id).subscribe(
      data => {
        this.Data = data;
        if (this.Data == 1) {
          this.router.navigate(["/home/buy"]);
        } else {
          alert("No Data");
        }
      },
      error => {
        alert("Server Error" + error);
      }
    );
  }
}
