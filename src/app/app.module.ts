import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NguiMapModule} from '@ngui/map';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';
// Import containers
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { LandingComponent } from './views/landing/landing.component';
import { ProfessionalRegisterComponent } from './views/professional-register/professional-register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';
// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { EmbedVideo } from 'ngx-embed-video';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileUploadModule } from 'ng2-file-upload';

import { BuyModule } from './buy/buy.module';
import { OperateModule } from './operate/operate.module';
import { SellModule } from './seller/sell.module';
import { GridModule } from './list/grid.module';
import { TransactionModule } from './Transaction-Map/transaction.module';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';
import { DataRoomModule } from './data-room/data-room.module';
import { RegisterModule } from './register/register.module';
import { LeaseTransactionModule } from './lease-transaction/lease-transaction.module';


@NgModule({
  imports: [   
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,  
    FileUploadModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    BuyModule,
    OperateModule,
    SellModule,
    GridModule,
    DataRoomModule,
    LeaseTransactionModule,
    RegisterModule,
    NgbModule,
    TransactionModule,
    ComponentsModule,
    PdfViewerModule,   
    NgbModule.forRoot(),
    EmbedVideo.forRoot(),
    NguiMapModule.forRoot(
      {apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyC56o9EoYPsP-K2SVVx6n4oC0ZfaM_Ay-0&libraries=visualization,places,drawing', 
       }),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    ProfessionalRegisterComponent,      
    LandingComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
   },      
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
