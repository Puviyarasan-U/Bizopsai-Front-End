import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NguiMapModule} from '@ngui/map';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { SharedModule } from '../shared/shared.module';
import { LeaseRoutingModule } from './lease-routing.module';
import { LeaseComponent } from './lease/lease.component';
import { LeaseDetailComponent } from './lease-detail/lease-detail.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { LandlordListComponent } from './landlord-list/landlord-list.component';

@NgModule({
  declarations: [
    LeaseComponent, 
    LeaseDetailComponent, TenantListComponent, LandlordListComponent
  ],
  imports: [
    CommonModule,
    LeaseRoutingModule,
    SharedModule,
    NgbModule,
    PdfViewerModule,
    NguiMapModule.forRoot(
      {apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyC56o9EoYPsP-K2SVVx6n4oC0ZfaM_Ay-0&libraries=visualization,places,drawing',   
   }), 
  ]
})
export class LeaseModule { }
