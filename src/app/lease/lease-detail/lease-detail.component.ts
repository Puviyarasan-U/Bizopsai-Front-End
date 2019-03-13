import { Component, OnInit, ElementRef, ViewChild, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { EmbedVideoService } from "ngx-embed-video";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import "rxjs/add/operator/filter";

import { HomeNodeService } from "../../services/HomeNodeService";
import { ListService } from "../../services/list.service";
import { NodeService } from "../../services/Nodeservice";
import { BuyerService } from "../../services/buyer.service";
import { LandlordService } from "../../services/landlord.service";

declare var google: any;

@Component({
  selector: "app-lease-detail",
  templateUrl: "./lease-detail.component.html",
  styleUrls: ["./lease-detail.component.scss"],
  providers: [NgbCarouselConfig]
})
export class LeaseDetailComponent implements OnInit {

  @ViewChild("closeContact") closeContact: ElementRef;
  public myModal;  
  contactSellerData: FormGroup;

  input_id: string;
  zoom = 8;
  Data: any;
  lat: number;
  company_id: any;
  lng: number;
  position: any = [];
  image: any;
  value: string;
  list: any;
  user_list: any;
  youtube_url: any;
  yt_url: any;
  sec_Images: any;
  img: boolean;
  masterProductList: any = [];
  productList: any = [];
  emailTo: string;

  submitted = false;
  user_name: string;
  user_id: string;

  isAlreadyTenant = false;
  alreadySave = false;

  constructor(
    private route: ActivatedRoute,
    public salelist: ListService,
    public router: Router,
    private user: NodeService,
    private embedService: EmbedVideoService,
    public config: NgbCarouselConfig,
    private home: HomeNodeService,
    private landlord: LandlordService,
    private buy: BuyerService,
    private fb: FormBuilder
  ) {
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;
  }

  ngOnInit() {
    
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
      }
    }

    this.contactSellerData = this.fb.group({
        FullName: ["", Validators.required],
        Phone: ["", Validators.required],
        Email: ["", [Validators.required, Validators.email]],
        MessageBox: ["", Validators.required],
        profEmail: [""]
    });

    /**LEASE TRANSACTION */
    this.route.queryParams
      .filter(params => params.biz_id)
      .subscribe(params => {
        this.value = params.biz_id;

        this.home.getLeaseList().subscribe(
          bizData => {
            this.Data = bizData;
            const rows = this.Data;
            if (rows.length > 0) {
                this.user_list = rows;
                const user = this.user_list.filter(
                  task => task.BIZ_ID == this.value
                );
                this.list = user[0];
                this.lat = this.list.LATITUDE;
                this.lng = this.list.LONGITUDE;
                this.position = [this.lat, this.lng];
                this.youtube_url = this.list.YOUTUBE_URL;
              //  this.yt_url = this.embedService.embed(this.youtube_url);
                // this.landlord.getLeaseSecImages(this.value).subscribe(
                //   data => {
                //     var secImgdata = data;                
                    // if (secImgdata[0].status != 'No Data Found') {                    
                    //   if (secImgdata.length > 0) {
                    //     this.img = true;
                    //     this.sec_Images = secImgdata;
                    //   }
                    //   else { this.img = false; }
                    // } 
                    this.landlord.checkExistingTenant(this.user_id).subscribe(
                      data=>{
                        var res = data;                        
                          if (res[0].status) {
                          } else if (this.user_id == res[0].USER_ID) {
                            this.isAlreadyTenant = true;
                            this.landlord.checkAlreadySaved(this.user_id).subscribe(
                              savedlist=>{
                                var res = savedlist;                        
                                if (res[0].status) {
                                } else  {
                                  var userSavedList = savedlist;
                                  var filterdData = userSavedList.filter(item=>{
                                    return item.COMPANY_ID == this.value;
                                  })
                                  if(filterdData.length>0){
                                    this.alreadySave = true;
                                  }
                                }
                              });
                          }
                        
                    });

                  // },
                  // error => {
                  //   alert("Server Error");
                  // });
             }
        });
    });
  }

  // detail(value) {
  //   this.router.navigate(["/home/detail"], { queryParams: { com_id: value } });
  // }

  saveList(value) { 
        if (this.user_name != undefined) {
          if(this.user_id != this.list.USER_ID){
            if(this.isAlreadyTenant){
              let details = {
                user_id: this.user_id,
                com_id: value
              };
              this.landlord.saveLeaseList(details).subscribe(data => {
                if (data > 0) {
                  alert("Saved Successfully !!!");
                  this.ngOnInit();
                }
              });
          } else{
            this.router.navigate(["/form/tenant-register"]);
          }
        } else {
           alert("It's Your Product You Can't Save !!!");          
        }
     } else {
       this.router.navigate(["/login"]);
     }
  }

  get f() {
    return this.contactSellerData.controls;
  }

  sendMail() {
    this.submitted = true;
    if (this.contactSellerData.invalid) {
      return;
    } else {
      this.contactSellerData.patchValue({
        profEmail: this.emailTo
      });

      this.closeContact.nativeElement.click();
    }
  }
  selectedEmail(value) {
    this.emailTo = value;
    console.log(value);
  }
}
