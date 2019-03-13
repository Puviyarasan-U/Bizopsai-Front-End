import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NguiMapModule} from '@ngui/map';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FileUploadModule } from 'ng2-file-upload';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';
import { LeaseComponent } from './lease/lease.component';
import { DetailComponent } from './detail/detail.component';
import { BuyerRegComponent } from './buyer-reg/buyer-reg.component';
import { BuyerEditComponent } from './buyer-edit/buyer-edit.component';
import { BuyerProfileComponent } from './buyer-profile/buyer-profile.component';
import { BuyRoutingModule} from './buy-routing.module';

@NgModule({
    imports: [  
     
      SharedModule,
      BuyRoutingModule,
      NgbModule,        
      FileUploadModule,     
      HttpClientModule,
      HttpModule, 
      ChartsModule, 
      PdfViewerModule,
      NguiMapModule.forRoot(
        {apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyC56o9EoYPsP-K2SVVx6n4oC0ZfaM_Ay-0&libraries=visualization,places,drawing',   
         }),      
    ],
    declarations: [
        HomeComponent,
        LeaseComponent,
        DetailComponent,
        BuyerRegComponent,
        BuyerEditComponent,
        BuyerProfileComponent     
    ],
    exports: [ ],
    providers: [
        
      ],
  })
  export class BuyModule { }