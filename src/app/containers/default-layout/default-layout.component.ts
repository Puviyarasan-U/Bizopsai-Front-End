import {Component, OnDestroy} from '@angular/core';
import { navItems,sellerNav,buyerNav,professionalNav,adminNav,LandlordNav,TenantNav } from './../../_nav';
import { Router } from '@angular/router';
import { NodeService } from '../../services/Nodeservice';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'

})
export class DefaultLayoutComponent implements OnDestroy {

  // public navItems = navItems;
  public navItems:any;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  user_name: string;
  user_id: string;
  isUser: boolean = false;
  isAdmin: boolean = false;
  public isCollapsed = false;
  public largeModal;
  adminData:any=[];
  admin:any;
  constructor( private user: NodeService,private router : Router,private adminUser :AdminService) {

    let userdata = JSON.parse(sessionStorage.getItem('Bizops_User'));    
    if(userdata){
      this.isUser = true;
      this.user_name = userdata.USER_FIRSTNAME;
      this.user_id = userdata.ID;
      if(this.user_name.toLowerCase()=='admin'){
        this.isAdmin = true;
        this.navItems = adminNav;    
      }
      else{
        this.isAdmin = false;
      }     
    } 
     else {
      this.isUser = false; 
    }

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: [ 'class' ]
    });
    this.adminUser.getAdmin().subscribe(
    data =>{
      this.adminData = data;
      this.admin = this.adminData[0].USER_FIRSTNAME;   
      if(this.isAdmin==false){
      this.user.checkFirstUser(this.user_id).subscribe(
      userType=>{
        var res = userType;       
          if(res[0].ID == 1){
            this.navItems = sellerNav;
          } 
          else if(res[0].ID == 2){
            this.navItems = buyerNav;
          }
          else if(res[0].ID == 3){
            this.navItems = professionalNav;
          }  
          else if(res[0].ID == 4){
            this.navItems = LandlordNav
          }  
          else if(res[0].ID == 5){
            this.navItems = TenantNav
          }
          else{
            // this.navItems = LandlordNav
          }   
      });
    }
    });
  } 
  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
