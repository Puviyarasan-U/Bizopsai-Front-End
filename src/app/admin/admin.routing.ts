import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { BusinessManagementComponent }  from './business-management/business-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ManageBizAdminsComponent } from './manage-biz-admins/manage-biz-admins.component';
import { AdminNotificationComponent } from './admin-notification/admin-notification.component';
export const routes: Routes = [
  { path: 'business-manage',  component: BusinessManagementComponent },
  { path: 'manage-bizAdmins',  component: ManageBizAdminsComponent },
  { path: 'user-manage',  component: UserManagementComponent },
  { path: 'manage-notification',  component: AdminNotificationComponent },
  { path: '',  component: BusinessManagementComponent }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }