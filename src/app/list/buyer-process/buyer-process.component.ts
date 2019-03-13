import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { NodeService } from "../../services/Nodeservice";
import { HomeNodeService } from "../../services/HomeNodeService";
import { ProcessService } from "../../services/process.service";

@Component({
  selector: "app-buyer-process",
  templateUrl: "./buyer-process.component.html",
  styleUrls: ["./buyer-process.component.scss"]
})
export class BuyerProcessComponent implements OnInit {
  Data: any;
  list: any;
  user_name: any;
  user_id: any;
  isList = true;
  businessList: any;
  businessTitle: string;
  CheckList: any = [];
  line: string;
  isChecklist = false;
  maxListId: any;
  order_num: number;

  constructor(
    private user: NodeService,
    private route: ActivatedRoute,
    private home: HomeNodeService,
    public router: Router,
    private process: ProcessService
  ) {}

  ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
      }
    }

    this.user.getSavedList(this.user_id).subscribe(buyerSavedList => {
      var res = buyerSavedList;
      if (res.length > 0) {
        if (res[0].status) {
          this.isList = false;
        } else {
          this.list = res;
          this.isList = true;
        }
      } else {
        alert("No Data");
      }
    });
  }

  toggleVisibility(value) {
    this.CheckList.find(item => item.ORDER_NUM == value).STATUS = 1;
  }

  buy_cmp_change() {
    if (this.businessTitle) {
      this.isChecklist = true;
      var selectedBusiness = this.list.filter(item => {
        return item.COMPANY_ID == this.businessTitle;
      });

      var post = {
        TranId: selectedBusiness[0].TRAN_ID,
        ComId: this.businessTitle
      };

      this.process.getProcessbyTran(post).subscribe(processData => {
        var res = processData;
        if (res.length > 0) {
          if (res[0].status) {
            this.process.getProcessbyCmp(this.businessTitle).subscribe(
              getCmpProcess => {
                var res = getCmpProcess;
                if (res.length > 0) {
                  if (res[0].status) {
                    //this.isList = false;
                  } else {
                    // this.CheckList = res;

                    for (let i = 0; i < res.length; i++) {
                      var _obj = {
                        TRAN_ID: selectedBusiness[0].TRAN_ID,
                        ORDER_NUM: res[i].ORDER_NUM,
                        STEPS: res[i].STEPS,
                        STATUS: 0,
                        USER_ID: this.user_id
                      };
                      this.CheckList.push(_obj);
                    }
                    // this.isList = true;
                  }
                } else {
                  alert("No Data");
                }
              });
          } else {
            this.CheckList = res;
          }
        } else {
          alert("No Data");
        }
      });
    }
  }

  updateProcess() {
    var post ={
      TRAN_ID: this.CheckList[0].TRAN_ID
    }
    this.process.deleteProcessbyTran(post).subscribe(deleteData=>{
      var res = deleteData;
      if(res>0){
        this.process.updateBuyerProcess(this.CheckList).subscribe(data => {
          var res = data;
          if (res > 0) {
            alert("Updated Successully!!!");
          }
        });
      }
    });   
  }
}
