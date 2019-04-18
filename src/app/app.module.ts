import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SummaryActivityComponent } from './components/summary-activity/summary-activity.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DashboardAwsComponent } from './components/dashboard-aws/dashboard-aws.component';
import { SearchComponent } from './components/search/search.component';
import { ActivityInterceptor } from './services/activityInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SummaryActivityComponent,
    ActivityListComponent,
    PaginationComponent,
    DashboardAwsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ActivityInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
