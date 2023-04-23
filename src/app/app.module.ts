import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { AdminEventRegistrationsComponent } from './components/admin/admin-event-registrations/admin-event-registrations.component';
import { AuthorityEventsDashboardComponent } from './components/authority/authority-events-dashboard/authority-events-dashboard.component';
import { AuthorityEventsRegistrationComponent } from './components/authority/authority-events-registration/authority-events-registration.component';
import { AuthorityIssueDashboardComponent } from './components/authority/authority-issue-dashboard/authority-issue-dashboard.component';
import { StudentEventsDashboardComponent } from './components/student/student-events-dashboard/student-events-dashboard.component';
import { StudentEventRegistrationsComponent } from './components/student/student-event-registrations/student-event-registrations.component';
import { StudentIssuesDashboardComponent } from './components/student/student-issues-dashboard/student-issues-dashboard.component';
import { StudentLeaderboardComponent } from './components/student/student-leaderboard/student-leaderboard.component';
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
    AdminIssuesDashboardComponent,
    AdminEventRegistrationsComponent,
    AuthorityEventsDashboardComponent,
    AuthorityEventsRegistrationComponent,
    AuthorityIssueDashboardComponent,
    StudentEventsDashboardComponent,
    StudentEventRegistrationsComponent,
    StudentIssuesDashboardComponent,
    StudentLeaderboardComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSliderModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      maxOpened: 3,
      autoDismiss: true,
      closeButton: false
    }),
    MatRadioModule,
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

