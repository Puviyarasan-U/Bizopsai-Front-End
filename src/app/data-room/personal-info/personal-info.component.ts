import { Component, Input, OnInit, OnChanges,SimpleChanges, SimpleChange } from '@angular/core';

import { DataroomService } from '../../services/dataroom.service';
import { HomeNodeService } from '../../services/HomeNodeService';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnChanges, OnInit {

  @Input('companyID') public com_id;

  selectedComID:any;
  personalInfoData = [];
  isNoPersonalData = false;
  DOC_MSTR = [];
  showDoc = false;
  

  constructor( private dataroom:DataroomService, private home: HomeNodeService,) { }

  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.com_id;
    // console.log('prev value: ', name.previousValue);
    // console.log('got name: ', name.currentValue);
    this.selectedComID = name.currentValue;
    this.personalInfoData = [];
    this.isNoPersonalData = false;

    if(this.selectedComID){

    this.dataroom.getPersonalInfo(this.selectedComID).subscribe(
     
      personalInfo=>{
        var res = personalInfo;
        if (res.length > 0) {
          if (res[0].status) {
              this.isNoPersonalData = true;
          } else {
            this.personalInfoData = res; 
          }
        }
        this.home.getTransBusiness(this.selectedComID).subscribe(
          data => {
            var res = data;
            if (res.length > 0) {
              if (res[0].status) {
              } else {
                this.DOC_MSTR = data;               
              }
            }
         });

      });


    }

  }

  ngOnInit() {

  }

  showPersonalDoc(){
    if(this.DOC_MSTR[0].LICENSE_IMG){
      this.showDoc = true;
    } else {
      alert('No Document Found, Contact Seller');
    }
  }
   
  
}
