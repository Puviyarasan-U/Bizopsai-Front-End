import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-manage-biz-admins',
  templateUrl: './manage-biz-admins.component.html',
  styleUrls: ['./manage-biz-admins.component.scss']
})
export class ManageBizAdminsComponent implements OnInit {
  @ViewChild('closeContact') closeContact: ElementRef;
  p:any;
  bizAdminRegisterData: FormGroup;
  submitted=false;
  public bizAdmin;

  bizAdminData: any = [];
  getBizAdmin : any = [];
  user_name:any;
  user_id:any;
  bizAdminPassword: number;
  bizAdminConfirmPassword: any;
  constructor(private fb: FormBuilder, private router: Router, private admin: AdminService) {    
  }

  ngOnInit() {
    this.bizAdminRegisterData = this.fb.group({
      bizAdminName: ['',Validators.required],
      bizAdminEmail: ['',[Validators.required, Validators.email]],
      bizAdminPassword: ['',Validators.required],
      bizAdminConfirmPassword: ['',Validators.required]
    });
    if(sessionStorage.length){
      if(sessionStorage.getItem('Bizops_User')){
        let userdata = JSON.parse(sessionStorage.getItem('Bizops_User'));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
      }        
    }
    this.admin.getBizAdmin().subscribe(data=>{
      this.getBizAdmin = data;
    });
  }
  get f() { return this.bizAdminRegisterData.controls; }

  bizAdminRegister() {
    this.submitted =true;
    if(this.bizAdminPassword == this.bizAdminConfirmPassword ){
    this.admin.createBizAdmin(this.bizAdminRegisterData.value).subscribe(data => {
      this.bizAdminData = data;
      var rows = this.bizAdminData;
      if (rows > 0) {           
        alert("Created Successfully");     
        this.ngOnInit();
        this.closeContact.nativeElement.click();

      }
    });
  }else{
    alert('Password And Confirm Password Are Different !!!');
  }
  }
  view(){

  }
  edit(){

  }
  hide(){

  }
  publish(){

  }
}
