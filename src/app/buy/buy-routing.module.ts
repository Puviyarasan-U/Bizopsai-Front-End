import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LeaseComponent } from './lease/lease.component';
import { DetailComponent } from './detail/detail.component';
import { BuyerRegComponent } from './buyer-reg/buyer-reg.component';
import { BuyerEditComponent } from './buyer-edit/buyer-edit.component';
import { BuyerProfileComponent } from './buyer-profile/buyer-profile.component';
export const routes: Routes = [
    {
        path: '',
        component : HomeComponent,
        data: {
          title: 'Buy'
        }         
    },
    // {
    //     path: 'lease',
    //     component : LeaseComponent,
    //     data: {
    //       title: 'Lease'
    //     }         
    // },
    {
        path: 'buyer-reg',
        component: BuyerRegComponent,
        data: {
          title: 'Buyer Register'
        }      
      },
      {
        path: 'buyer-profile',
        component: BuyerProfileComponent,
        data: {
          title: 'Buyer Profile'
        }      
      }, 
      {
        path: 'buyer-edit',
        component: BuyerEditComponent,
        data: {
          title: 'Buyer Edit'
        }      
      },  
      {
        path: 'buy',
        component : HomeComponent,
        data: {
          title: 'Buy'
        }         
      },
      {
        path: 'detail',
        component: DetailComponent,  
        data: {
          title: 'Detail'
        }          
      },

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BuyRoutingModule { }
