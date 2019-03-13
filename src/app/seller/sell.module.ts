import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NguiMapModule} from '@ngui/map';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from '../shared/shared.module';

import { SellerRegisterComponent } from './seller-register/seller-register.component';
import { SellerEditComponent } from './seller-edit/seller-edit.component';
import {SellerRoutingModule}  from './seller-routing.module';

@NgModule({
  imports: [   
    SharedModule,  
    SellerRoutingModule,  
    FileUploadModule,
    PdfViewerModule,
    NgbModule,   
    NguiMapModule.forRoot(
        {apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyC56o9EoYPsP-K2SVVx6n4oC0ZfaM_Ay-0&libraries=visualization,places,drawing', 
         }),
  ],
  declarations: [
    SellerRegisterComponent,
    SellerEditComponent
  ],
  providers: [
          
  ],
})
export class SellModule { }
