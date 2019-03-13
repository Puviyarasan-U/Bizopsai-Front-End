import { Component, Output, EventEmitter, OnInit, AfterContentInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { LandlordService } from '../../services/landlord.service';

@Component({
  selector: 'app-lease-terms',
  templateUrl: './lease-terms.component.html',
  styleUrls: ['./lease-terms.component.scss']
})
export class LeaseTermsComponent implements OnInit {

  @Output() talk: EventEmitter<any> = new EventEmitter<any>();
  @Input('terms') public terms: FormGroup;

  user_name: any;
  user_id: any;
  submitted = false;

  constructor(private fb: FormBuilder, private landlord:LandlordService) { }
  
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
    return this.terms.controls;
  }
  saveLeaseTerms(){
    this.submitted = true;
    this.landlord.insertLeaseTerms(this.terms.value).subscribe(
      data => {                 
        var res = data;
        if (res > 0) { 
          var post = {
            tab:2,
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
