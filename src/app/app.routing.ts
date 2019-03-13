import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Import Containers
import { AuthGuard } from './guards/auth.guard';
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { LandingComponent } from './views/landing/landing.component';
import { ProfessionalRegisterComponent } from './views/professional-register/professional-register.component';
import { ProfessionalDetailComponent } from './operate/professional-detail/professional-detail.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'landing',
    component: LandingComponent,
    data: {
      title: 'landing Page'
    },
    canActivate: [AuthGuard]
  },
  
  
  {
    path: 'professionalregister',
    component : ProfessionalRegisterComponent,         
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
 
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },
    children: [ 
      {path: 'home', loadChildren: './buy/buy.module#BuyModule'},
      {path: 'lease', loadChildren: './lease/lease.module#LeaseModule'},
      {path: 'list', loadChildren: './list/grid.module#GridModule',canActivate: [AuthGuard]},
      {path: 'operate', loadChildren: './operate/operate.module#OperateModule'},
      {path: 'seller', loadChildren: './seller/sell.module#SellModule', canActivate: [AuthGuard]},
      {path: 'tran', loadChildren: './Transaction-Map/transaction.module#TransactionModule', canActivate: [AuthGuard]},    
      {path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard]},
      {path: 'data', loadChildren: './data-room/data-room.module#DataRoomModule', canActivate: [AuthGuard]},
      {path: 'form', loadChildren: './register/register.module#RegisterModule', },
      {path: 'lease-transaction', loadChildren: './lease-transaction/lease-transaction.module#LeaseTransactionModule',canActivate: [AuthGuard] },

     
      {
        path: 'professional-detail',
        component: ProfessionalDetailComponent,
        data: {
          title: 'Detail'
        }      
      },
     
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
