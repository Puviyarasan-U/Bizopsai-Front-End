import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { NodeService } from "../../services/Nodeservice";
import { HomeNodeService } from "../../services/HomeNodeService";
import { BuyerService } from "../../services/buyer.service";
import { ProcessService } from "../../services/process.service";

const Agreement_URL = 'http://localhost:3010/api/process/agreement';
const POF_URL = 'http://localhost:3010/api/process/proof-funds';


@Component({
  selector: "app-process-overview",
  templateUrl: "./process-overview.component.html",
  styleUrls: ["./process-overview.component.scss"]
})
export class ProcessOverviewComponent implements OnInit {

  public agreementUploader: FileUploader = new FileUploader({url: Agreement_URL, itemAlias: 'Agreement' });
  public POFUploader: FileUploader = new FileUploader({url: POF_URL, itemAlias: 'Agreement' });

  user_name: any;
  user_id: any;
  isUser = false;

  sellerList: any;
  companyId: any;
  processList: any =[];
  isComSelected = false;
  selectAction = '';

  DOC_Agreement:any;
  offerPrice: any;
  seller_NDA = [];
  isSellerNDA = false;
  viewNDA = false;

  constructor(
    private user: NodeService,
    public router: Router,
    private home: HomeNodeService,
    private buyer: BuyerService,
    private process: ProcessService
  ) {}

  ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
        this.isUser = true;
      }
    }

    this.user.checkFirstUser(this.user_id).subscribe(userType => {
      var res = userType;
      if (res[0].ID == 1) {
       
      } else if (res[0].ID == 2) {
        // Buyer
        this.user.getSavedList(this.user_id).subscribe(buyerSavedList => {
          var buyer_res = buyerSavedList;
          if (buyer_res.length > 0) {
            if (buyer_res[0].status) {
              //this.isList = false;
            } else {
              this.sellerList = buyer_res;
              this.companyId = this.sellerList[0].COMPANY_ID;
              this.changeCompany();
            }
          } else {
            alert("No Data");
          }
        });
      } else if (res[0].ID == 3) {
       
      }
    });
  }

  changeCompany() {
    // this.isProcess = false;
    this.processList = [];
    this.isComSelected = true;
    this.selectAction = '';
    var companyList = this.sellerList.filter(item => {
      return item.COMPANY_ID === this.companyId;
    });

    if (companyList.length > 0) { 
      var post = {
        TranId: companyList[0].TRAN_ID,
        ComId: this.companyId
      };

      this.process.getProcessbyTran(post).subscribe(processData => {
        var res = processData;
        if (res.length > 0) {
          if (res[0].status) {
            this.process.getProcessbyCmp(this.companyId).subscribe(
              getCmpProcess => {
                var res = getCmpProcess;
                if (res.length > 0) {
                  if (res[0].status) {
                    //this.isList = false;
                  } else {                 

                    for (let i = 0; i < res.length; i++) {
                      var _obj = {
                        TRAN_ID: companyList[0].TRAN_ID,
                        ORDER_NUM: res[i].ORDER_NUM,
                        STEPS: res[i].STEPS,
                        STATUS: 0,
                        USER_ID: this.user_id
                      };
                      this.processList.push(_obj);
                    }                  
                   
                  }
                } else {
                  alert("No Data");
                }
              });
          } else {
            this.processList = res;
            var continueAction = this.processList.filter(item => {
                return item.STATUS === 0;
            });
            this.selectAction = continueAction[0].STEPS;
          }
        } else {
          alert("No Data");
        }
      });
    } else {
      //this.isbuyerList = false;
    }
  }

  processAction(value){
    console.log(value);
    this.selectAction = value;
    if(this.selectAction == "Agreements"){
      this.process.getNDA(this.companyId).subscribe(
        NDAdocument=>{
          var res = NDAdocument;
          if (res.length > 0) {
            if (res[0].status) {
             this.isSellerNDA = false;
            } else { 
              this.seller_NDA = res;
             this.isSellerNDA = true;

            }
          }
        });
    }

  }

  toggleVisibility(value) {
    var data = this.processList.find(item => item.ORDER_NUM == value);
    if (data.STATUS == 0) {
      this.processList.find(item => item.ORDER_NUM == value).STATUS = 1;
    } else if (data.STATUS == 1) {
      this.processList.find(item => item.ORDER_NUM == value).STATUS = 0;
    }
  }
  acceptList(){
    this.processList.find(item => item.STEPS == 'Search Business').STATUS = 1;
    this.updateProcess();
  }
  uploadNDA(){
    this.processList.find(item => item.STEPS == 'Agreements').STATUS = 1;
    this.updateProcess();
  }
  uploadPOF(){
    this.processList.find(item => item.STEPS == 'Due Diligence').STATUS = 1;
      var post = {
        TranId: this.processList[0].TRAN_ID,
        BuyerId: this.user_id,
        SellerId: this.processList[0].SELLER_ID
      }
    this.home.requestDataroom(post).subscribe(data=>{
      var res = data;
      if(res>0){
        this.updateProcess();
      } 
    });
   
  }
  acceptInspection(){
    this.processList.find(item => item.STEPS == 'Site Inspection').STATUS = 1;
    this.updateProcess();
  }
  acceptOffer(){
    this.processList.find(item => item.STEPS == 'Offer').STATUS = 1;
      var post = {
        offerPrice: this.offerPrice,
        TranId: this.processList[0].TRAN_ID
      }
    this.process.putOfferPrice(post).subscribe(data=>{
      var res = data;
      if(res>0){
        this.updateProcess();
      }
    });
   
  }
  acceptClosing(){
    this.processList.find(item => item.STEPS == 'Closing').STATUS = 1;
    this.updateProcess();
  }
  acceptEscrow(){
    this.processList.find(item => item.STEPS == 'Escrow').STATUS = 1;
    this.updateProcess();
  }

  updateProcess() {
    var post = {
      TRAN_ID: this.processList[0].TRAN_ID
    };
    this.process.deleteProcessbyTran(post).subscribe(deleteData => {
      var res = deleteData;
      if (res > 0) {
        this.process.updateBuyerProcess(this.processList).subscribe(data => {
          var res = data;
          if (res > 0) {
            alert("Updated Successully!!!");
          }
        });
      }
    });
  }
}
