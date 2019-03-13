import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { LandlordService } from '../../services/landlord.service';


@Component({
  selector: 'app-landlord-register',
  templateUrl: './landlord-register.component.html',
  styleUrls: ['./landlord-register.component.scss']
})
export class LandlordRegisterComponent implements OnInit {

  @ViewChild('tab') public tabs: NgbTabset;
  checkoutForm: FormGroup;

  BUS_ID :any;
  Biz_ID: string;
  user_name: any;
  user_id: any;

  edit_id: any;

  isFirstTime = true;
  userLeaseList:any;
  isRedirected = false;
  
  constructor(private fb: FormBuilder,private landlord:LandlordService,  private route: ActivatedRoute,) { }

  ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;      
      }
    } 
    this.route.queryParams
    .filter(params => params.biz_id)
    .subscribe(params => {
      console.log(params);
      this.isRedirected = true;
      //this.loadLeaseData(params.biz_id)
       this.edit_id = params.biz_id;
    });


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
            UserType: [3]
      }),
      business: this.fb.group({
        UserID: [''],
        BizID: [''],
        CompanyName: [''],
        Address: [''],
        Email: [''],
        Telephone: [''],
        Website: ['']
      }),
      building: this.fb.group({
        BizID: [''],
        BuildingType: [''],
        BuildingSubTypes: [''],
        BuildingSize: [''],
        BuiltYear: [''],
        RestRoom: [''],
        BuildingZone: [''],
        BuildingPark: [''],   
      }),
      premises: this.fb.group({
        BizID: [''],
        SizeOfUnit: [''],  
        State: [''],
        County: [''],
        SpaceType: [''],
        YoutubeUrl: ['']   
      }),
      terms: this.fb.group({
        BizID: [''],
        CommercialRent: [''],
        Duration: ['']
      }),      
    })

    this.landlord.getLeaseByUserID(this.user_id).subscribe(
      userleaselist=>{
        var res = userleaselist;
        if (res.length > 0) {
          if (res[0].status) {
              
          } else {
            this.userLeaseList = res;
            if(!this.isRedirected){
                this.isFirstTime = false;
             } else{
               this.loadLeaseData(this.edit_id);
             }
        }
      }
      });
    
  }  

  get f() {
    return this.checkoutForm.controls;
  }

  formInitialized(name: string, form: FormGroup) {
    this.checkoutForm.setControl(name, form);    
  }

  talkBack(e: any) { 
    if(e.Biz_ID){
      this.Biz_ID = e.Biz_ID;     
      this.checkoutForm.patchValue({
        business:{
          BizID: this.Biz_ID
        },
        building:{
          BizID: this.Biz_ID
        },
        premises:{
          BizID: this.Biz_ID
        },
        terms:{
          BizID: this.Biz_ID
        }
      });
      this.tabs.select(e.tab);
    } else {
      this.tabs.select(e);
    }
  }

  change(){
    alert('Cooooll !!!')
  }

  loadLeaseData(value){
    console.log(value);
    var filteredList = this.userLeaseList.filter(item=>{
        return item.BIZ_ID == value;
    });
    var loadData = filteredList[0];
    this.checkoutForm.patchValue({
      personal: {
        UserID: loadData.USER_ID,
        Name: loadData.NAME,     
        HomeAddress: loadData.HOME_ADDRESS,     
        Email: loadData.EMAIL,
        FaxNumber: loadData.FAX_NUMBER,
        CellPhone: loadData.CELL_NUMBER,
        HomePhone: loadData.HOME_NUMBER,     
        DOB: loadData.DOB,
        BirthPlace: loadData.BIRTH_PLACE,
        HomeNum1: loadData.HOME_NUM_1,
        HomeNum2: loadData.HOME_NUM_2,
        UserType: loadData.USER_TYPE
  },
  business: {   
    BizID:loadData.BIZ_ID,
    CompanyName: loadData.COMPANY_NAME,
    Address: loadData.ADDRESS,
    Email: loadData.EMAIL,
    Telephone: loadData.TELEPHONE,
    Website: loadData.WEBSITE,
  },
  building: {
    BizID: loadData.BIZ_ID,   
    BuildingSize: loadData.BUILDING_SIZE,
    BuiltYear: loadData.BUILT_YEAR,
    RestRoom: loadData.NO_OF_RESTROOMS,
    BuildingZone: loadData.ZONING,
    BuildingPark: loadData.PARKING,  
  },
  premises: {
    BizID: loadData.BIZ_ID,
    SizeOfUnit: loadData.SIZE_OF_UNIT, 
    YoutubeUrl: loadData.YOUTUBE_URL,
    State: loadData.STATE,
    County: loadData.COUNTY,
    SpaceType: loadData.SPACE_TYPE   
  },
  terms: {
    BizID: loadData.BIZ_ID,
    CommercialRent: loadData.RENT,
    Duration: loadData.DURATION,
  }, 
    });
    this.isFirstTime = true;
  }
}
