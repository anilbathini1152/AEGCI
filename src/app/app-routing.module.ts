import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/Shared/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AuthorityDashboardComponent } from './components/authority/authority-dashboard/authority-dashboard.component';
import { StudnetDashboardComponent } from './components/student/studnet-dashboard/studnet-dashboard.component';
import { AdminUsersDashboardComponent } from './components/admin/admin-users-dashboard/admin-users-dashboard.component';
import { AdminEventsDashboardComponent } from './components/admin/admin-events-dashboard/admin-events-dashboard.component';
import { AdminIssuesDashboardComponent } from './components/admin/admin-issues-dashboard/admin-issues-dashboard.component';
import { AdminEventRegistrationsComponent } from './components/admin/admin-event-registrations/admin-event-registrations.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'user-details', component: AdminUsersDashboardComponent },
      { path: 'event-details', component: AdminEventsDashboardComponent },
      { path: 'issue-details', component: AdminIssuesDashboardComponent },
      { path: "evnt-regs", component: AdminEventRegistrationsComponent }
    ]
  },
  {
    path: 'authority',
    component: AuthorityDashboardComponent,
    children: []
  },
  {
    path: 'student',
    component: StudnetDashboardComponent,
    children: []
  },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
