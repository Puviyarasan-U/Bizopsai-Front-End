import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  isBuySell: boolean;
  isBuyer: boolean;
  isSeller: boolean;

  isLease: boolean;
  isLandlord: boolean;
  isTenant: boolean;

  isOperate: boolean;
  isProfessional: boolean;
  isPrincipleAgent: boolean;

  mainLanding: string;
  isMain = true;
  childLanding: string;

  user_name: string;
  user_id: string;
  isUser: boolean = false;

  constructor() { }

  ngOnInit() {

    let userdata = JSON.parse(sessionStorage.getItem('Bizops_User'));    
    if(userdata){
      this.isUser = true;
      this.user_name = userdata.USER_FIRSTNAME;
      this.user_id = userdata.ID;
    } else {
      this.isUser = false; 
    }

  }

  onRoleChange(value){
    this.mainLanding = value;
    this.isMain = false;
    if (this.mainLanding=='buySell'){this.isBuySell = true;this.isLease = false;this.isOperate = false; }
    else if(this.mainLanding =='lease'){this.isLease = true;this.isBuySell = false;this.isOperate = false; }
    else if(this.mainLanding =='Operations'){this.isOperate = true;this.isBuySell = false;this.isLease = false; }

  }

  back(){
    this.isMain = true;
    this.isBuySell = false;
    this.isLease = false;
    this.isOperate = false;
  }

}
