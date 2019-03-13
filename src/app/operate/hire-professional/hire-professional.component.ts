import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { NodeService } from "../../services/Nodeservice";
import { HomeNodeService } from "../../services/HomeNodeService";

@Component({
  selector: "app-hire-professional",
  templateUrl: "./hire-professional.component.html",
  styleUrls: ["./hire-professional.component.scss"]
})
export class HireProfessionalComponent implements OnInit {
  @ViewChild("closeContact") closeContact: ElementRef;
  public myModal;

  contactProfessionalData: FormGroup;
  stateList: any = [];
  countyList: any = [];
  citiesList: any = [];
  professionalList: any = [];
  // categoryList=['Accounting & Finance','Construction','Human Resources','Information Technology',
  //               'Legal','Logistics & Transportation','Marketing, Advertising & Promotions',
  //               'Real Estate','Telecommunications & Cable',];

  categoryList = [
    { cname: "Accounting & Finance" },
    { cname: "Construction", scname: "Architect" },
    { cname: "Construction", scname: "Landscape" },
    { cname: "Construction", scname: "Surveyor" },
    { cname: "Construction", scname: "Contractor" },
    { cname: "Construction", scname: "Engineer" },
    { cname: "Human Resources" },
    { cname: "Information Technology", scname: "Cybersecurity" },
    { cname: "Information Technology", scname: "Software development" },
    { cname: "Information Technology", scname: "IT Support" },
    { cname: "Information Technology", scname: "Systems analyst" },
    { cname: "Legal" },
    { cname: "Logistics & Transportation" },
    { cname: "Marketing, Advertising & Promotions" },
    { cname: "Real Estate", scname: "Commercial" },
    { cname: "Real Estate", scname: "Residential" },
    { cname: "Real Estate", scname: "Property Management" },
    { cname: "Telecommunications & Cable" }
  ];
  emailTo: any;
  submitted = false;

  user_name: any;
  user_id: any;

  tran_id: any;
  istran_id = false;
  serviceType: any;
  actionType: any;
  ComId: any;
  isComId = false;

  constructor(
    private user: NodeService,
    public router: Router,
    private route: ActivatedRoute,
    public home: HomeNodeService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
      }
    }

    this.route.queryParams
      .filter(params => params.type)
      .subscribe(params => {
        this.tran_id = params.tran_id;
        if (this.tran_id != undefined) {
          this.istran_id = true;
        }
        this.serviceType = params.service;
        this.actionType = params.type;
        this.ComId = params.ComId;
        if (this.ComId != undefined) {
          this.isComId = true;
        }
      });

    this.contactProfessionalData = this.fb.group({
      FullName: ["", Validators.required],
      Phone: ["", Validators.required],
      Email: ["", [Validators.required, Validators.email]],
      MessageBox: ["", Validators.required],
      profEmail: [""]
    });
    this.home.getProfessionalList().subscribe(data => {
      this.professionalList = data;
      this.home.getStateList().subscribe(data => {
        this.stateList = data;
        this.home.getCountyList().subscribe(data => {
          this.countyList = data;
        });
      });
    });
  }

  changeState($event) {
    if ($event == undefined) {
      this.citiesList = [];
    } else {
      this.citiesList = this.countyList.filter(item => {
        return item.state_code === $event.state_code;
      });
    }
  }

  navigateProfDetail(value) {
    this.router.navigate(["/professional-detail"], {
      queryParams: { prof_id: value }
    });
  }

  sendMail() {
    this.submitted = true;
    if (this.contactProfessionalData.invalid) {
      return;
    } else {
      this.contactProfessionalData.patchValue({
        profEmail: this.emailTo
      });

      //  this.user.sendMail(this.contactProfessionalData.value).subscribe(result => {
      //    var data = result;
      //    alert('sucess');
      //  })
      this.closeContact.nativeElement.click();
    }
  }

  selectedEmail(value) {
    this.emailTo = value;
    console.log(value);
  }
  get f() {
    return this.contactProfessionalData.controls;
  }

  hire(value) {
    if (this.tran_id) {
      var post = {
        Prof_Id: value,
        User_Id: this.user_id,
        Tran_Id: this.tran_id,
        service: this.serviceType
      };

      if (this.actionType == "add") {
        this.user.hireProfessional(post).subscribe(
          result => {
            var data = result;
            if (data > 0) {
              alert("request Send");
            }
          },
          err => {
            console.log(err);
            alert("servor error!!");
          }
        );
      } else if (this.actionType == "update") {
        this.user.updateProfessional(post).subscribe(
          result => {
            var data = result;
            if (data > 0) {
              alert("request Send");
            }
          },
          err => {
            console.log(err);
            alert("servor error!!");
          }
        );
      } else if (this.actionType == "buyer") {
        var buyerData = {
          UserId: this.user_id,
          ProfId: value,
          TranId: this.tran_id
        };
        this.user.buyerPrincipleAgent(buyerData).subscribe(
          result => {
            var data = result;
            if (data > 0) {
              alert("request Send");
            }
          },
          err => {
            console.log(err);
            alert("servor error!!");
          }
        );
      }
    } else if (this.isComId) {
      var details = {
        Prof_Id: value,
        User_Id: this.user_id,
        ComId: this.ComId,
        service: this.serviceType
      };

      if (this.actionType == "add") {
        this.user.hireBizProf(details).subscribe(
          result => {
            var data = result;
            if (data > 0) {
              alert("request Send");
            }
          },
          err => {
            console.log(err);
            alert("servor error!!");
          }
        );
      } else if (this.actionType == "update") {
        this.user.updateBizProf(details).subscribe(
          result => {
            var data = result;
            if (data > 0) {
              alert("request Send");
            }
          },
          err => {
            console.log(err);
            alert("servor error!!");
          }
        );
      } else if (this.actionType == "seller") {
        var post_data = {
          ComId: this.ComId,
          ProfId: value,
          UserId: this.user_id
        };
        this.user.sellerPrincipleAgent(post_data).subscribe(
          result => {
            var data = result;
            if (data > 0) {
              alert("request Send");
            }
          },
          err => {
            console.log(err);
            alert("servor error!!");
          }
        );
      } else {
      }
    }
  }
}
