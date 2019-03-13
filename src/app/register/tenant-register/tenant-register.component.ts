import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tenant-register',
  templateUrl: './tenant-register.component.html',
  styleUrls: ['./tenant-register.component.scss']
})
export class TenantRegisterComponent implements OnInit {

  @ViewChild('tab') public tabs: NgbTabset;
  checkoutForm: FormGroup;
  justified='justified';
  constructor(private fb: FormBuilder,) { }

  ngOnInit() {
    this.checkoutForm = this.fb.group({
      personal: this.fb.group({
        UserID: [''],
        Name: [''],     
        HomeAddress: [''],     
        Email: [''],
        FaxNumber: [''],
        CellPhone: [''],
        HomePhone: [''],     
        DOB: [''],
        BirthPlace: [''],
        HomeNum1: [''],
        HomeNum2: [''],
        UserType: [4]
      }),  
    })

    console.log(this.checkoutForm.value)
  }  

  talkBack(e: any) { 
    this.tabs.select(e);
  }

}
