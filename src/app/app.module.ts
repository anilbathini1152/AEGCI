import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Shared/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import {MatSliderModule} from '@angular/material/slider'
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptorService } from './services/authorization-interceptor.service';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AuthorityDashboardComponent } from './components/authority/authority-dashboard/authority-dashboard.component';
import { StudnetDashboardComponent } from './components/student/studnet-dashboard/studnet-dashboard.component';
import { AdminUsersDashboardComponent } from './components/admin/admin-users-dashboard/admin-users-dashboard.component';
import { AdminEventsDashboardComponent } from './components/admin/admin-events-dashboard/admin-events-dashboard.component';
import { AdminIssuesDashboardComponent } from './components/admin/admin-issues-dashboard/admin-issues-dashboard.component';
import { ErrorInterceptorService } from './services/error-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    AdminDashboardComponent,
    AuthorityDashboardComponent,
    StudnetDashboardComponent,
    AdminUsersDashboardComponent,
    AdminEventsDashboardComponent,
    AdminIssuesDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatSliderModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
  ], 
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthorizationInterceptorService,
    multi:true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass:ErrorInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

