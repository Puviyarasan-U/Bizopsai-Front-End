import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { SavedListComponent } from './saved-list/saved-list.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { CreateChecklistComponent } from './create-checklist/create-checklist.component';
import { HomeComponent } from '../buy/home.component';
import { BuyerProcessComponent} from './buyer-process/buyer-process.component';
import {ProcessOverviewComponent} from './process-overview/process-overview.component';
export const routes: Routes = [
    {
        path: 'savedlist',
        component: SavedListComponent,      
    }, 
    {
        path: '',
        component:SavedListComponent,      
    },  
    {
        path: 'create-checklist',
        component: CreateChecklistComponent,
        data: {
          title: 'Create Checklist'
        }      
    }, 
    {
        path: 'addedlist',
        component: GridComponent,      
    }, 
    {
        path: 'buyer-process',
        component: BuyerProcessComponent,
        data: {
          title: 'Buyer Edit'
        }      
      },
      {
         path: 'process',
        component: ProcessOverviewComponent,
        data: {
          title: 'Process'
        }      
      },  
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListRoutingModule { }
