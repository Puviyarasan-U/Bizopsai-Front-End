import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { NodeService } from "../../services/Nodeservice";
import { CheckService } from "../../services/check.service";
import { MailService } from "../../services/mail.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {
  userEmail = "";
  userPassword = "";
  all_data: any = {};
  Data: any;
  focus: any;

  isVeriyNav = false;
  isForgotPwd = false;

  constructor(
    private user: NodeService,
    private router: Router,
    private mail: MailService,
    private check: CheckService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    sessionStorage.removeItem("Bizops_User");
    this.route.queryParams.filter(params => params.email)
      .subscribe(params => {
     this.isVeriyNav = true;
          var user_details = {
            Username: params.name,
            Email: params.email,
            Password: params.pwd
          }
      this.mail.userVeriication(user_details).subscribe(
        data =>{            
          var res = data;
          if (res > 0) {

          }  else{ alert('Please Try After Some Time !!!!');}      
          },        
          error=>{
              alert("Server Error");
              console.log(error);
          }); 
    });
  }

  trimValue(event) {
    event.target.value = event.target.value.trimLeft();
  }

  login() {
    const post = {
      Email: this.userEmail,
      Password: this.userPassword
    };
    this.user.login(post).subscribe(
      data => {
        //   this.blockUI.stop();
        this.Data = data;
        if (this.Data[0].status) {
          alert("credential Failed !!!");
        } else {
          const rows = this.Data[0].USER_PASSWORD;
          if (rows.length > 0) {
            // var user=this.Data[0].USER_FIRSTNAME;
            const lsdata = this.Data[0];
            sessionStorage.setItem("Bizops_User", JSON.stringify(lsdata));
            this.user.checkFirstUser(this.Data[0].ID).subscribe(userType => {
              var res = userType;
              if (rows == post.Password) {
                if (res[0].ID == 0) {
                  this.router.navigate(["/landing"]);
                } 
                else if(res[0].ID == 4){
                  this.router.navigate(["/lease"]);
                }else {
                  this.router.navigate(["/home/buy"]);
                }
              }
            });
          } else {
            alert("credential Failed !!!");
          }
        }
      },
      error => {
        alert("Server Error");
      }
    );
  }

  forgot_password(){
    this.isForgotPwd = true;
    if(this.userEmail =='' && this.userEmail==undefined){
      alert('Enter The Valid Email Address');

    }else{      
      this.mail.forgetPassword(this.userEmail).subscribe(
        response=>{
          var res = response;
          if (res.length > 0) {

            alert("Please Check Your Mail To Reset Your Password!!!");
            
          }

        });

    }
   

  }
}
