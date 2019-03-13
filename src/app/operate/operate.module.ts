import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { OperateComponent } from './operate.component';
import { HireProfessionalComponent } from './hire-professional/hire-professional.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { ProfessionalDetailComponent } from './professional-detail/professional-detail.component';
import { OperateRoutingModule } from './operate.routing';

// import { NodeService } from '../services/Nodeservice';
// import { HomeNodeService } from '../services/HomeNodeService';

@NgModule({
  imports: [   
    OperateRoutingModule,
    SharedModule
  ],
  declarations: [
    OperateComponent,
    HireProfessionalComponent,
    BuyProductComponent,
    ProfessionalDetailComponent
  ],
  providers: [
    // NodeService,
    // HomeNodeService
  ],
  
})
export class OperateModule { }
