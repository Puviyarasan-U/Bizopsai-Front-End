import { Component, Output, EventEmitter, OnInit, AfterContentInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { LandlordService } from '../../services/landlord.service';


@Component({
  selector: 'app-business-entity-form',
  templateUrl: './business-entity-form.component.html',
  styleUrls: ['./business-entity-form.component.scss']
})
export class BusinessEntityFormComponent implements  OnInit {

  @Input('business') public business: FormGroup;

  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() talk: EventEmitter<any> = new EventEmitter<any>();

  businessEntityForm: FormGroup;
  submitted = false;
  user_name: any;
  user_id: any;

  constructor(private fb: FormBuilder, private landlord:LandlordService) {}

  ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
       // this.isUser = true;
      }
    } 
  }

  get f() {
    return this.business.controls;
  }

  saveBusinessEntityInfo(){
    this.submitted = true;
    this.business.patchValue({
      UserID:this.user_id
    })
    this.landlord.insertBusinessEntity(this.business.value).subscribe(
      data => {                 
        var res = data;
        if (res > 0) { 
          var post = {
            tab:'2',
            Biz_ID:res
          }
          this.talk.emit(post);
        }
      },
      error => {
        alert("Server Error Please Try After Sometime!!!");
        console.log(error);
      }
    );
  }

}
