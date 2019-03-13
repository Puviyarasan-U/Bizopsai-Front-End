import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';


import { DataRoomRoutingModule } from './data-room-routing.module';
import { MainDataRoomComponent } from './main-data-room/main-data-room.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { BusinessInfoComponent } from './business-info/business-info.component';
import { BuildingInfoComponent } from './building-info/building-info.component';
import { PremisesInfoComponent } from './premises-info/premises-info.component';
import { FinancialInfoComponent } from './financial-info/financial-info.component';
import { OtherDocumentsComponent } from './other-documents/other-documents.component';

@NgModule({
 
  imports: [
    CommonModule,
    NgbModule,
    DataRoomRoutingModule,
    PdfViewerModule,
    SharedModule
  ],
  declarations: [
    MainDataRoomComponent, 
    PersonalInfoComponent, 
    BusinessInfoComponent, 
    BuildingInfoComponent, 
    PremisesInfoComponent, 
    FinancialInfoComponent, 
    OtherDocumentsComponent
  ],
})
export class DataRoomModule { }
