import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


import { NodeService } from '../services/Nodeservice';
import { HomeNodeService } from '../services/HomeNodeService';
import { EquipmentService } from '../services/equipment.service';
import { SellerService } from '../services/seller.service';
import { ListService } from '../services/list.service';
import { BuyerService } from '../services/buyer.service';
import { CheckService } from '../services/check.service';
import { AdminService } from '../services/admin.service';
import { ProcessService } from '../services/process.service';
import { DataroomService } from '../services/dataroom.service';
import { MailService } from '../services/mail.service';
import { LandlordService } from '../services/landlord.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    NgbModule,
    NgSelectModule,
    NgxPaginationModule,
    ReactiveFormsModule,

  ],
  providers: [
    AdminService,
    BuyerService,
    CheckService,
    DataroomService,
    EquipmentService,   
    HomeNodeService, 
    LandlordService,      
    ListService,
    MailService,
    NodeService,
    ProcessService,
    SellerService,   
  ],
  exports: [
    CommonModule,
    FormsModule,
    ModalModule,
    NgSelectModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
