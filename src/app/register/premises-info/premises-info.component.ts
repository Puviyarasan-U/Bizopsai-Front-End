import { Component, Output, EventEmitter, OnInit, AfterContentInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

import { LandlordService } from '../../services/landlord.service';
import { HomeNodeService } from '../../services/HomeNodeService';

const PRI_IMG = 'http://localhost:3010/api/lease/upload/prime-image';
const SEC_IMG = 'http://localhost:3010/api/lease/upload/sec-image';

@Component({
  selector: 'app-premises-info',
  templateUrl: './premises-info.component.html',
  styleUrls: ['./premises-info.component.scss']
})
export class PremisesInfoComponent implements OnInit {

  @Input('premises') public premises: FormGroup;

  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();

  premisesInfoForm: FormGroup;

  public PrimeImgUploader: FileUploader = new FileUploader({ url: PRI_IMG, itemAlias: 'Prime-lease-img' });
  public SecImgUploader: FileUploader = new FileUploader({ url: SEC_IMG, itemAlias: 'Sec-lease-img' });

  primeImg: any = [];
  SecImg: any = [];
  isUpload: boolean;
  maxFileSize = 1048576;
  user_name: any;
  user_id: any;
  submitted = false;
  stateList: any;
  countyList: any;
  citiesList: any[];
  currentState: any;
  SpaceType: any;
  building_types: any;

  constructor(private fb: FormBuilder, private landlord:LandlordService,
              private home: HomeNodeService,) { }
 

  ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
       // this.isUser = true;
      }
    }

    this.home.getStateList().subscribe(
      data => {
        this.stateList = data;
        this.home.getCountyList().subscribe(
          data => {
            this.countyList = data;
            this.home.getBuildingTypes().subscribe(
              data => {
                this.building_types = data;
              });
          });
      });    

    this.PrimeImgUploader.onAfterAddingFile = (file) => {
      if (file) {
        console.log(file);
        const reader = new FileReader();
        const imageFile: any = file.file.rawFile;
        let list = {};
        reader.onload = () => {
          list = {
            filename: imageFile.name,
            filetype: imageFile.type,
            value: (reader.result as string).split(',')[1]
          };
          this.primeImg.push(list);
        };
        if (imageFile.size < this.maxFileSize) {
          reader.readAsDataURL(imageFile);
          this.isUpload = true;
        } else {
          alert("File size must be less that 1mb and more that 1kb!");
        }
      }
    };

    this.SecImgUploader.onAfterAddingFile = (file) => {
      if (file) {
        const reader = new FileReader();
        const imageFile: any = file.file.rawFile;
        let list = {};
        reader.onload = () => {
          list = {
            filename: imageFile.name,
            filetype: imageFile.type,
           value : (reader.result as string).split(',')[1]
          };
          this.SecImg.push(list);
        };
        if (imageFile.size < this.maxFileSize) {
          reader.readAsDataURL(imageFile);
          this.isUpload = true;
        } else {
          alert("File size must be less that 1mb and more that 1kb!");
        }
      }
    };   
  }

  get f() {
    return this.premises.controls;
  }

  changeState($event) {
    this.citiesList = this.countyList.filter((item) => {
      return item.state_code === $event.state_code;
    });   
  }

  savePremisesInfo(){
    this.submitted = true;
    this.landlord.insertPremisesInfo(this.premises.value).subscribe(
      data => {                 
        var res = data;        
          if(res > 0 && this.primeImg.length>0){         
          this.PrimeImgUploader.setOptions({ additionalParameter: { Company_ID: this.premises.value.BizID } });      
          this.PrimeImgUploader.uploadAll();                                     
          this.PrimeImgUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => { 
              if(response === 'Uploaded Sucessfully' && this.SecImg.length>0){
                this.SecImgUploader.setOptions({ additionalParameter: { Company_ID: this.premises.value.BizID } });
                this.SecImgUploader.uploadAll();             
                this.SecImgUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                if (response === 'Uploaded Sucessfully') {                  
                    this.talk.emit('4');
                }
              }             
            } else {
              this.talk.emit('4');
            }           
          }
        } else{
          this.talk.emit('4');
        }   
  },
  error => {
    alert("Server Error Please Try After Sometime!!!");
    console.log(error);
  }
);
  }  

  clearPrimeImg() {  
    this.primeImg = [];
  }

  clearSecImg() {   
    this.SecImg = [];
  }

}
