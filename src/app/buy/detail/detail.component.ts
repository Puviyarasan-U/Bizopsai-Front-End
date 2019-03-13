import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EmbedVideoService } from 'ngx-embed-video';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/filter';

import { HomeNodeService } from '../../services/HomeNodeService';
import { ListService } from '../../services/list.service';
import { NodeService } from '../../services/Nodeservice';
import { BuyerService } from '../../services/buyer.service';

declare var google: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [NgbCarouselConfig]
})
export class DetailComponent implements OnInit {

  @ViewChild('closeContact') closeContact: ElementRef;
  public myModal;
  alreadySave: boolean = false;
  contactSellerData: FormGroup;
  SaveData_bySeller: any = [];
  checkBusiness: any = [];
  checkSellerID: any = [];
  alreadyCheckedID: any = [];
  alreadyInterest: boolean = true;
  saveCompany_id: any;
  sellerSaveData: any = [];
  BuyerId: any = [];
  splitID: any;
  alreadySaved: any = [];
  alreadySavedID: any;
  saveID: any;
  @Input()
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
  constructor(private route: ActivatedRoute, public salelist: ListService, public router: Router, private user: NodeService,
    private embedService: EmbedVideoService, public config: NgbCarouselConfig, private home: HomeNodeService,
    private buy: BuyerService, private fb: FormBuilder, ) {
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;

  }

  ngOnInit() {

    this.BuyerId = [];
    if (sessionStorage.length) {
      if (sessionStorage.getItem('Bizops_User')) {
        let userdata = JSON.parse(sessionStorage.getItem('Bizops_User'));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
      }
    }

    this.contactSellerData = this.fb.group({
      FullName: ['', Validators.required],
      Phone: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      MessageBox: ['', Validators.required],
      profEmail: [''],
    });

    /**BUY-SELL TRANSACTION */
    this.route.queryParams
      .filter(params => params.com_id)
      .subscribe(params => {
        this.value = params.com_id;

        this.user.getBiz().subscribe(
          bizData => {
            //   this.blockUI.stop();
            this.Data = bizData;
            const rows = this.Data;
            if (rows.length > 0) {
              this.user_list = rows;
              const user = this.user_list.filter(task => task.COMPANY_ID == this.value);
              this.list = user[0];
              this.lat = this.list.LATITUDE;
              this.lng = this.list.LONGITUDE;
              this.position = [this.lat, this.lng];
              this.youtube_url = this.list.YOUTUBE_URL;
              this.yt_url = this.embedService.embed(this.youtube_url);

              this.user.getImage(this.value).subscribe(
                data => {
                  var secImgdata = data;
                  //   this.blockUI.stop();
                  if (secImgdata[0].status != 'No Data Found') {
                    const secImgList = secImgdata;
                    if (secImgList.length > 0) {
                      this.img = true;
                      this.sec_Images = secImgList;
                    }
                    else { this.img = false; }
                  }
                  this.home.getProductList().subscribe(
                    data => {
                      //   this.blockUI.stop();
                      this.masterProductList = data;
                      this.productList = this.masterProductList.filter(task =>
                        task.CATEGORY == this.list.CATEGORY && task.TITLE !== this.list.TITLE);
                      this.buy.getBuyerID(this.user_id).subscribe(
                        data => {
                          this.BuyerId = data;
                          this.splitID = this.BuyerId[0].USER_ID;
                          let details = {
                            user_id: this.user_id,
                            com_id: this.value
                          }
                          this.buy.alreadySaved(details).subscribe(
                            data => {
                              this.alreadySaved = data;
                              if (this.alreadySaved[0].status != "No Data Found") {
                                this.alreadySave = true;
                                this.alreadyInterest = false;                               
                              }
                            });                        

                        });
                    });

                });
            } else { alert('Servor Error'); }
          },
          error => {
            alert('Server Error');
          });
      });
     
  }

  detail(value) {
    this.router.navigate(['/home/detail'], { queryParams: { com_id: value } });
  }

  saveList(data) {
    if (this.user_name != undefined) {
      this.saveCompany_id = data;
      // for (var i = 0; i < this.BuyerId.length; i++) {
      if ((this.BuyerId[0].status == 'No Data Found' || this.BuyerId[0].USER_ID != this.user_id)) {
        this.router.navigate(['/home/buyer-reg'], { queryParams: { com_id: data } });
      } else {
        let details = {
          user_id: this.user_id,
          com_id: this.saveCompany_id
        }
        this.buy.checkBusiness(details).subscribe(
          data => {
            this.checkBusiness = data;
            if (this.checkBusiness[0].status != "No Data Found") {
              alert("Its your Business");
            } else {
              this.buy.alreadySaved(details).subscribe(
                data => {
                  this.alreadySaved = data;
                  if (this.alreadySaved[0].status != "No Data Found") {
                    alert("Its already saved");
                  }
                  else {
                    this.home.saveList(details).subscribe(
                      data => {
                        if (data > 0) {
                          alert('Saved Successfully !!!');
                          this.ngOnInit();
                        }
                      });
                  }
                });
            }
          });
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
  get f() { return this.contactSellerData.controls; };

  sendMail() {
    this.submitted = true;
    if (this.contactSellerData.invalid) { return; }
    else {
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
