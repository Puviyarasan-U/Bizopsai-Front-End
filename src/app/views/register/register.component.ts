import { Component, OnInit } from "@angular/core";
import { NodeService } from "../../services/Nodeservice";
import { Router, ActivatedRoute } from "@angular/router";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MailService } from "../../services/mail.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "register.component.html"
})
export class RegisterComponent {
  submitted = false;
  userRegisterData: FormGroup;
  resetPasswordForm: FormGroup;

  tran_type: any = "Select Type";

  userName: any;
  userEmail: any;
  userPassword: number;
  userConPassword: any;
  showmodel1: boolean = false;
  isMatch = false;
  Data: any;

  isResetPwd = false;
  constructor(
    private user: NodeService,
    private fb: FormBuilder,
    private mail: MailService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userRegisterData = this.fb.group({
      Username: ["", Validators.required],
      Email: ["", [Validators.required, Validators.email]],
      Password: ["", Validators.required],
      Confirm_Password: ["", Validators.required]
    });

    this.resetPasswordForm = this.fb.group({
      Email: ["", [Validators.required, Validators.email]],
      Password: ["", Validators.required],
      Confirm_Password: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.email)
      .subscribe(params => {
        this.isResetPwd = true;
        this.userEmail = params.email;
      });
  }

  trimValue(event) {
    event.target.value = event.target.value.trimLeft();
  }

  click(option) {
    this.tran_type = option;
  }

  get f() {
    return this.userRegisterData.controls;
  }
  get r() {
    return this.resetPasswordForm.controls;
  }

  register() {
    this.submitted = true;
    if (this.userRegisterData.invalid) {
      return;
    } else {
      if (this.userPassword === this.userConPassword) {
        this.isMatch = false;
        this.user.createUser(this.userRegisterData.value).subscribe(
          data => {                 
            var res = data;
            if (res.length > 0) {
              this.userRegisterData.reset(); 
              alert('Please Verify Your Email To Register Your Account');              
              this.router.navigate(["login"]);
            }
          },
          error => {
            alert("Server Error");
            console.log(error);
          }
        );
      } else {
        this.isMatch = true;
        alert("Password And Confirm Password Are Different !!!");
      }
    }
  }

  resetPwd() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    } else {
      if (this.userPassword === this.userConPassword) {
        this.isMatch = false;
        this.mail.updateUserPassword(this.resetPasswordForm.value).subscribe(
          data => {
            var res = data;
            if (res > 0) {
              this.userRegisterData.reset();
              this.router.navigate(["login"]);
            }
          },
          error => {
            alert("Server Error");
            console.log(error);
          }
        );
      } else {
        this.isMatch = true;
        alert("Password And Confirm Password Are Different !!!");
      }
    }
  }
}
