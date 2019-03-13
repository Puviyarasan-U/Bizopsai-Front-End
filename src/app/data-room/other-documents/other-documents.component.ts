import { Component, Input, OnInit, OnChanges,SimpleChanges, SimpleChange } from '@angular/core';

import { DataroomService } from '../../services/dataroom.service';

@Component({
  selector: 'app-other-documents',
  templateUrl: './other-documents.component.html',
  styleUrls: ['./other-documents.component.scss']
})
export class OtherDocumentsComponent implements OnChanges, OnInit {

  @Input('companyID') public com_id;
  selectedComID:any;
  otherDocumentMstr = [];
  isNoData = false;
  isShowCompliance = false;
  isShowliability = false;
  isShowRetirement = false;
  isShowContract = false;
  
  constructor( private dataroom:DataroomService) { }

  ngOnChanges(changes: SimpleChanges) {

    const name: SimpleChange = changes.com_id;
  
    this.selectedComID = name.currentValue;
    this.otherDocumentMstr = [];

    this.dataroom.getPersonalInfo(this.selectedComID).subscribe(
      personalInfo=>{
        var res = personalInfo;
        if (res.length > 0) {
          if (res[0].status) {
              this.isNoData = true;
          } else {
            this.otherDocumentMstr = res; 
                  
          }
        }
      });
  }

  ngOnInit() {
    
  }
  showLiability(){
    if(this.otherDocumentMstr[0].FIN_REPORT){
      this.isShowliability = true;
    } else {
      alert('No Document Found, Contact Seller');
    }
  }
  showRetirement(){
    if(this.otherDocumentMstr[0].FIN_REPORT){
      this.isShowRetirement = true;
    } else {
      alert('No Document Found, Contact Seller');
    }
  }
  showContract(){
    if(this.otherDocumentMstr[0].FIN_REPORT){
      this.isShowContract = true;
    } else {
      alert('No Document Found, Contact Seller');
    }
  }
  showCompliance(){
    if(this.otherDocumentMstr[0].FIN_REPORT){
      this.isShowCompliance = true;
    } else {
      alert('No Document Found, Contact Seller');
    }
  }

}
