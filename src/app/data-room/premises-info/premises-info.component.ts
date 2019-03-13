import { Component, Input, OnInit, OnChanges,SimpleChanges, SimpleChange } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { DataroomService } from '../../services/dataroom.service';

@Component({
  selector: 'app-premises-info',
  templateUrl: './premises-info.component.html',
  styleUrls: ['./premises-info.component.scss']
})
export class PremisesInfoComponent implements OnChanges, OnInit {

  @Input('companyID') public com_id;
  selectedComID:any;
  premisesInfoData = [];
  isNoPremisesData = false; 

  constructor( private dataroom:DataroomService) { }

  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.com_id;
    // console.log('prev value: ', name.previousValue);
    // console.log('got name: ', name.currentValue);
    this.selectedComID = name.currentValue;
    this.premisesInfoData = [];
    this.isNoPremisesData = false;
    if(this.selectedComID){
    this.dataroom.getPremisesInfo(this.selectedComID).subscribe(
      personalInfo=>{
        var res = personalInfo;
        if (res.length > 0) {
          if (res[0].status) {
              this.isNoPremisesData = true;
          } else {
            this.premisesInfoData = res;  
          }
        }
      });
    }

  }

  ngOnInit() {
    console.log(this.com_id);
  }

}
