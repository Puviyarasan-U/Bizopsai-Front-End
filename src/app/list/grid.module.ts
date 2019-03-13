import { NgModule } from '@angular/core';

import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { SharedModule } from '../shared/shared.module';

import { GridComponent } from './grid/grid.component';
import { SavedListComponent } from './saved-list/saved-list.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { CreateChecklistComponent } from './create-checklist/create-checklist.component';
import { ListRoutingModule } from './list-routing.module';
import {ProcessOverviewComponent} from  '../list/process-overview/process-overview.component';
import { BuyerProcessComponent } from './buyer-process/buyer-process.component';

@NgModule({
  imports: [  
    SharedModule,     
    FileUploadModule,
    NgbModule,   
    ListRoutingModule,
    PdfViewerModule
  ],
  declarations: [
    GridComponent,
    SavedListComponent,
    ChecklistComponent,
    CreateChecklistComponent,
    ProcessOverviewComponent,
    BuyerProcessComponent
  ],
  providers: [
    // ListService,
    // NodeService,
    // HomeNodeService,       
    // EquipmentService,
    // SellerService,
    // ProcessService        
  ],
})
export class GridModule { }
