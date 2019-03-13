import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';

import { RegisterRoutingModule }  from './register-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LandlordRegisterComponent } from './landlord-register/landlord-register.component';
import { PersonalFormComponent } from './personal-form/personal-form.component';
import { BusinessEntityFormComponent } from './business-entity-form/business-entity-form.component';
import { FinancialInfoFormComponent } from './financial-info-form/financial-info-form.component';
import { BuildingInfoFormComponent } from './building-info-form/building-info-form.component';
import { TenantRegisterComponent } from './tenant-register/tenant-register.component';
import { PremisesInfoComponent } from './premises-info/premises-info.component';
import { LeaseTermsComponent } from './lease-terms/lease-terms.component';

@NgModule({
  declarations: [
    LandlordRegisterComponent,
    PersonalFormComponent,
    BusinessEntityFormComponent,
    FinancialInfoFormComponent,
    BuildingInfoFormComponent,
    TenantRegisterComponent,
    PremisesInfoComponent,
    LeaseTermsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FileUploadModule,
    RegisterRoutingModule,
    SharedModule
  ],
  exports: [
    LandlordRegisterComponent,
    PersonalFormComponent,
    BusinessEntityFormComponent,
    FinancialInfoFormComponent,
    BuildingInfoFormComponent
  ]
})
export class RegisterModule { }
