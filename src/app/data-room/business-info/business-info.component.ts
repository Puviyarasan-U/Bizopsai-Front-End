import { Component, Input, OnInit, OnChanges,SimpleChanges, SimpleChange } from '@angular/core';

import { DataroomService } from '../../services/dataroom.service';

@Component({
  selector: 'app-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.scss']
})
export class BusinessInfoComponent implements OnChanges, OnInit {

  @Input('companyID') public com_id;
  selectedComID:any;
  businessInfoData = [];
  isNoBusinessData = false;

  constructor( private dataroom:DataroomService) { }

  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.com_id;
    // console.log('prev value: ', name.previousValue);
    // console.log('got name: ', name.currentValue);
    this.selectedComID = name.currentValue;
    this.businessInfoData = [];
    this.isNoBusinessData = false;

    if(this.selectedComID){
    this.dataroom.getBusinessInfo(this.selectedComID).subscribe(
      personalInfo=>{
        var res = personalInfo;
        if (res.length > 0) {
          if (res[0].status) {
              this.isNoBusinessData = true;
          } else {
            this.businessInfoData = res;                
          }
        }
      });
    }

  }

  ngOnInit() {
    console.log(this.com_id);
  }

}
