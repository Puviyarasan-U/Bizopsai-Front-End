import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesComponent } from '../Transaction-Map/services/services.component';
import { NotificationComponent } from '../Transaction-Map/notification/notification.component';
import { DataRoomComponent } from './data-room/data-room.component';
import { MapComponent } from '../Transaction-Map/map/map.component';
export const routes: Routes = [  
   
   
    {
        path: 'service',
        component: ServicesComponent,
        data: {
            title: 'Services'
        }
    },   
    {
        path: 'map',
        component: MapComponent,
        data: {
            title: 'Transaction Map'
        }
    },
    {
        path: 'notification',
        component: NotificationComponent,
        data: {
            title: 'Notification'
        }
    },
    {
        path: 'data-room',
        component: DataRoomComponent,
        data: {
            title: 'Data Room'
        }
    },

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionRoutingModule { }
