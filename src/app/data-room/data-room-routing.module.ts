import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainDataRoomComponent } from './main-data-room/main-data-room.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { BusinessInfoComponent } from './business-info/business-info.component';
import { BuildingInfoComponent } from './building-info/building-info.component';
import { PremisesInfoComponent } from './premises-info/premises-info.component';
import { FinancialInfoComponent } from './financial-info/financial-info.component';
import { OtherDocumentsComponent } from './other-documents/other-documents.component';

const routes: Routes = [
  {
    path: '',
    component: MainDataRoomComponent,
    data: {
      title: 'Data Room'
    },
    children: [
      // {
      //   path: '',
      //   redirectTo: 'persional-info'
      // },
      {
        path: 'personal-info',
        component: PersonalInfoComponent,
        data: {
          title: 'personal-info'
        }
      },
      {
        path: 'business-info',
        component: BusinessInfoComponent,
        data: {
          title: 'business-info'
        }
      },
      {
        path: 'building-info',
        component: BuildingInfoComponent,
        data: {
          title: 'building-info'
        }
      },
      {
        path: 'premises-info',
        component: PremisesInfoComponent,
        data: {
          title: 'premises-info'
        }
      },
      {
        path: 'financial-info',
        component: FinancialInfoComponent,
        data: {
          title: 'financial-info'
        }
      },
      {
        path: 'other-documents',
        component: OtherDocumentsComponent,
        data: {
          title: 'Other Documents'
        }
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoomRoutingModule { }
