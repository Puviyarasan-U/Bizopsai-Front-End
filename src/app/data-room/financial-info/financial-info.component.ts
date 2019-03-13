import { Component, Input, OnInit, OnChanges,SimpleChanges, SimpleChange } from '@angular/core';

import { DataroomService } from '../../services/dataroom.service';
import { HomeNodeService } from '../../services/HomeNodeService';

@Component({
  selector: 'app-financial-info',
  templateUrl: './financial-info.component.html',
  styleUrls: ['./financial-info.component.scss']
})
export class FinancialInfoComponent implements OnChanges, OnInit {

  @Input('companyID') public com_id;
  selectedComID:any;
  financialInfoData = [];
  isNoFinancialData = false;
  DOC_MSTR = [];
  showDoc = false;
  

  constructor( private dataroom:DataroomService, private home: HomeNodeService,) { }

  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.com_id;
    // console.log('prev value: ', name.previousValue);
    // console.log('got name: ', name.currentValue);
   
    this.selectedComID = name.currentValue;
    this.financialInfoData = [];
    this.isNoFinancialData = false;


    if(this.selectedComID){   

    this.dataroom.getFinancialInfo(this.selectedComID).subscribe(
      personalInfo=>{
        var res = personalInfo;
        if (res.length > 0) {
          if (res[0].status) {
              this.isNoFinancialData = true;
          } else {
            this.financialInfoData = res;                 
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
    console.log(this.com_id);
  }

  showPersonalDoc(){
    if(this.DOC_MSTR[0].FIN_IMG){
      this.showDoc = true;
    } else {
      alert('No Document Found, Contact Seller');
    }
  }

}
