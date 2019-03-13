import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerRegisterComponent } from './seller-register/seller-register.component';
import { SellerEditComponent } from './seller-edit/seller-edit.component';
export const routes: Routes = [
    {
        path: 'sell',
        component : SellerRegisterComponent,
        data: {
          title: 'Sell'
        }         
      },
      {
        path: 'edit',
        component : SellerEditComponent,
        data: {
          title: 'Edit'
        }         
      },       
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SellerRoutingModule { }
