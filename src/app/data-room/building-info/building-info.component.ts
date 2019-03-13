import { Component, Input, OnInit, OnChanges,SimpleChanges, SimpleChange } from '@angular/core';

import { DataroomService } from '../../services/dataroom.service';

@Component({
  selector: 'app-building-info',
  templateUrl: './building-info.component.html',
  styleUrls: ['./building-info.component.scss']
})
export class BuildingInfoComponent implements OnChanges, OnInit {

  @Input('companyID') public com_id;
  selectedComID:any;
  buildingInfoData = [];
  isNoBuildingData = false;

  constructor( private dataroom:DataroomService) { }

  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.com_id;
    // console.log('prev value: ', name.previousValue);
    // console.log('got name: ', name.currentValue);
    this.selectedComID = name.currentValue;
    this.buildingInfoData = [];
    this.isNoBuildingData = false;

    if(this.selectedComID){
    this.dataroom.getPersonalInfo(this.selectedComID).subscribe(
      personalInfo=>{
        var res = personalInfo;
        if (res.length > 0) {
          if (res[0].status) {
              this.isNoBuildingData = true;
          } else {
            this.buildingInfoData = res; 
          }
        }
      });
    }

  }

  ngOnInit() {
    console.log(this.com_id);
  }

}
