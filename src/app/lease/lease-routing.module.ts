import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LeaseComponent } from "./lease/lease.component";
import { LeaseDetailComponent } from "./lease-detail/lease-detail.component";
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { LandlordListComponent } from './landlord-list/landlord-list.component';

const routes: Routes = [
        {
          path: "",
          component: LeaseComponent,
          data: {
            title: "Lease"
          }
        },
        {
          path: "lease-detail",
          component: LeaseDetailComponent,
          data: {
            title: "Lease Detail"
          }
        },
        {
          path: "landlord-list",
          component: LandlordListComponent,
          data: {
            title: "Landlord List"
          }
        },
        {
          path: "tenant-list",
          component: TenantListComponent,
          data: {
            title: "Tenant List"
          }
        }
      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaseRoutingModule {}
