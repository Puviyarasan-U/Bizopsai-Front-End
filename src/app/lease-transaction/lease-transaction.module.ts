import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { SharedModule } from '../shared/shared.module';

import { LeaseTransactionRoutingModule } from './lease-transaction-routing.module';

import { LeaseServiceComponent } from './lease-service/lease-service.component';
import { LeaseMapComponent } from './lease-map/lease-map.component';


@NgModule({
  declarations: [
    LeaseServiceComponent,
    LeaseMapComponent
  ],
  imports: [
    BsDropdownModule,
    NgbModule,
    PdfViewerModule,
    SharedModule,
    LeaseTransactionRoutingModule
  ]
})
export class LeaseTransactionModule { }
