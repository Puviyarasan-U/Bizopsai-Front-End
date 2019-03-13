import { Component, Output, EventEmitter, OnInit, AfterContentInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

import { LandlordService } from '../../services/landlord.service';

const SOC_DOC = 'http://localhost:3010/api/lease/upload/social-doc';
const LIC_DOC = 'http://localhost:3010/api/lease/upload/license-doc';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss']
})
export class PersonalFormComponent implements  OnInit {

  @Output() formReady = new EventEmitter<FormGroup>()
  @Output() talk: EventEmitter<any> = new EventEmitter<any>();

  @Input('personal') public personal: FormGroup;

  public SocialUploader: FileUploader = new FileUploader({ url: SOC_DOC, itemAlias: 'Social-Docs' });
  public LicenseUploader: FileUploader = new FileUploader({ url: LIC_DOC, itemAlias: 'License-Docs' });

  
  personalInfoForm: FormGroup;
  submitted=false;
  user_name: any;
  user_id: any;
  isInitiated= false;

  isSocialDocs = false;
  isLicenseDocs = false;

  constructor(private fb: FormBuilder, private landlord:LandlordService) { }

  ngOnInit() {

    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;      
      }
    } 
    this.SocialUploader.onAfterAddingFile = (file) => {
      if (file) {            
        this.isSocialDocs = true;
      }
    };

    this.LicenseUploader.onAfterAddingFile = (file) => {
      if (file) {            
        this.isLicenseDocs = true;
      }
    };

  }

  get f() {
    return this.personal.controls;
  }

  savePersonalInfo(){
    this.submitted = true;
    if(this.personal.invalid ) {
      alert('Please Fill All The Fields !!!');
      return;
    } else {
      this.personal.patchValue({
        UserID:this.user_id,       
      })
      this.landlord.insertPersonalInfo(this.personal.value).subscribe(
        data => {                 
          var res = data;        
          if(res > 0 && this.isSocialDocs ){         
          this.SocialUploader.setOptions({ additionalParameter: { UserID: this.user_id } });      
          this.SocialUploader.uploadAll();                                     
          this.SocialUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => { 
              if(response === 'Uploaded Sucessfully' && this.isLicenseDocs ){
                this.LicenseUploader.setOptions({ additionalParameter: { UserID: this.user_id } });
                this.LicenseUploader.uploadAll();             
                this.LicenseUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                if (response === 'Uploaded Sucessfully') {                  
                    this.talk.emit('1');
                } else {
                  this.talk.emit('1');
                }  
              }             
            } else {
              this.talk.emit('1');
            }           
          }
        } else{
          this.talk.emit('1');
        } 
        },
        error => {
          alert("Server Error Please Try After Sometime!!!");
          console.log(error);
        }
      );
    }   
  }

}
