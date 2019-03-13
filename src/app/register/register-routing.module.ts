import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandlordRegisterComponent } from './landlord-register/landlord-register.component';
import { TenantRegisterComponent } from './tenant-register/tenant-register.component';


export const routes: Routes = [
    {
        path: 'landlord-register',
        component : LandlordRegisterComponent,
        data: {
          title: 'Land Registration'
        }         
      },
      {
        path: 'tenant-register',
        component : TenantRegisterComponent,
        data: {
          title: 'Tenant Registration'
        }         
      },
         
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegisterRoutingModule { }
