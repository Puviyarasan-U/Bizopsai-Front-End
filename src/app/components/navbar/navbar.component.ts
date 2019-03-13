import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router, NavigationEnd, Event  } from '@angular/router'
import Chart from 'chart.js';
import { NodeService } from '../../services/Nodeservice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    @ViewChild('closeLogin') closeLogin: ElementRef;
    @ViewChild('closeRegister') closeRegister: ElementRef;
    @ViewChild('openLogin') openLogin: ElementRef;


    private listTitles: any[];
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    public isCollapsed = true;
    public isLoggedUser = false;
    public navShow = true;
    public isAdmin = false;

    user_name: any;
    user_id: any;
    currentUrl: any;
    list: any;
    Data: any;

    userEmail = '';
    userPassword = '';
    all_data: any = {};
   // Data :any;
    focus: any;

    submitted = false;
  userRegisterData: FormGroup;
  tran_type: any = 'Select Type';

  userName: any;
  user_Email: any;
  user_Password: number;
  userConPassword: any;
  showmodel1 = false;
  isMatch = false;
    trimValue(event) { event.target.value = event.target.value.trimLeft(); }
    closeLoginModal() {this.closeLogin.nativeElement.click(); }
    closeRegisterModal() {this.closeRegister.nativeElement.click(); }
    openLoginModal() {this.openLogin.nativeElement.click(); }
    logout() {
        this.isLoggedUser = false;
        sessionStorage.removeItem('Bizops_User');
        this.ngOnInit();
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
                        alert('credential Failed !!!');
                    } else {
                    const rows = this.Data[0].USER_PASSWORD;
                    if (rows.length > 0) {
                       // var user=this.Data[0].USER_FIRSTNAME;
                       const lsdata = this.Data[0];
                        sessionStorage.setItem('Bizops_User', JSON.stringify(lsdata));
                      if (rows == post.Password) {
                        //this.router.navigate(['/home']);
                         this.closeLoginModal();
                         this.ngOnInit();
                         }
                      } else { alert('credential Failed !!!'); }
                 }
              },
            error => {
                alert('Server Error');
            });
         }

    constructor(location: Location,
          private element: ElementRef,
          private router: Router,
          private user: NodeService,
          private fb: FormBuilder,

        ) {

            this.userRegisterData = this.fb.group({
                FirstName: ['', Validators.required],
                Email: ['', [Validators.required, Validators.email]],
                Password: ['', Validators.required],
                ConfirmPassword: ['', Validators.required],
             });
          this.location = location;
          this.sidebarVisible = false;

    }

    click(option) { this.tran_type = option; }

     get f() { return this.userRegisterData.controls; }
     
     register() {
       this.submitted = true;
       if (this.userRegisterData.invalid) { return; } else {
        if (this.user_Password === this.userConPassword) {
          this.isMatch = false;
               this.user.createUser(this.userRegisterData.value).subscribe(
               data => {          
                this.Data = data;
                console.log(this.Data);
                const rows = this.Data;
                if (rows > 0) {
                    this.userRegisterData.reset();
                    this.closeRegisterModal();
                    this.openLoginModal();                  
                  }
          },
          error => { alert('Server Error'); console.log(error); });
        } else { this.isMatch = true; }
      }
    }

    ngOnInit() {
        this.userEmail = '';
        this.userPassword = '';
        this.navShow = true;
        const userdata = JSON.parse(sessionStorage.getItem('Bizops_User'));
        if (userdata) {
             this.user_name = userdata.USER_FIRSTNAME;
             this.user_id = userdata.ID;
                 if (this.user_name) {
                     this.isLoggedUser = true;
                     if (this.user_name.toLowerCase() == 'admin') {
                             this.isAdmin = true;
                       }
                  }
             }
    }

    sellerClick() {
        if (this.isLoggedUser) {
            this.router.navigate(['/seller/seller']);
         } else {
            this.router.navigate(['/login']);
         }

        }

    collapse() {
      this.isCollapsed = !this.isCollapsed;
      const navbar = document.getElementsByTagName('nav')[0];
      console.log(navbar);
      if (!this.isCollapsed) {
     
      } else {
       
      }
    }
    
}
