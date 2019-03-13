import { HireProfessionalComponent } from './hire-professional/hire-professional.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
export const routes: Routes = [
  { path: 'hire',  component: HireProfessionalComponent },
  { path: '',  component: HireProfessionalComponent },
  { path: 'product',  component: BuyProductComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperateRoutingModule { }