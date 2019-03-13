import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaseServiceComponent } from './lease-service/lease-service.component';
import { LeaseMapComponent } from './lease-map/lease-map.component';

const routes: Routes = [

  {
    path: "",
    component: LeaseMapComponent,
    data: {
      title: "Lease Map"
    }
  },
  {
    path: "lease-service",
    component: LeaseServiceComponent,
    data: {
      title: "Lease Service"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaseTransactionRoutingModule { }
