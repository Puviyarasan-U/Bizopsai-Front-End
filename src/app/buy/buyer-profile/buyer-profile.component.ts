import { Component, OnInit } from '@angular/core';
import { BuyerService } from '../../services/buyer.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-buyer-profile',
  templateUrl: './buyer-profile.component.html',
  styleUrls: ['./buyer-profile.component.scss']
})
export class BuyerProfileComponent implements OnInit {
  buyerDetail:any=[];
  user_name:any;
  getBuyer_ID:any=[];
  buy_ID:any;
  user_id:any;
  showlicensePDF:boolean = false;
  showbankPDF:boolean = false;
  showfinPDF:boolean = false;
  constructor(private buy : BuyerService,private route : ActivatedRoute,private router : Router) { }

  ngOnInit() {
    let userdata = JSON.parse(sessionStorage.getItem('Bizops_User'));     
      this.user_name = userdata.USER_FIRSTNAME;
      this.user_id = userdata.ID;
      this.buy.getBuy_ID(this.user_id).subscribe(
        data =>{
          this.getBuyer_ID = data;                 
          this.buy_ID  = this.getBuyer_ID[0].ID;
          console.log( this.buy_ID);
          this.buy.getBuyerDetail(this.buy_ID).subscribe(
            data => {
              this.buyerDetail = data;
              console.log(this.buyerDetail);      
            });
        });
   
  }
  licenseReport(){
    this.showlicensePDF =true;
  }
  bankReport(){
    this.showbankPDF = true;
  }
  finReport(){
   this.showfinPDF = true;
  }
  hideFinReport(){
    this.showfinPDF = false;
  }
  hidebankReport(){
    this.showbankPDF = false;
  }
  hidelicenseReport(){
    this.showlicensePDF =false;
  }
  buyerEdit(value){
    this.router.navigate(['/home/buyer-edit'],{queryParams: { com_id: this.buy_ID }});
  }
}
