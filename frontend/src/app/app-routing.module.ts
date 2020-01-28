import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user-management/login/login.component';
import { SignupComponent } from './user-management/signup/signup.component';
import { SettingComponent } from './user-management/setting/setting.component';
import { UserManagementComponent } from './user-management/setting/account/user-management/user-management.component';
import { TooltipModule } from 'ngx-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateElectionComponent } from './create-election/create-election.component';

const routes: Routes = [
  {path:'', redirectTo : 'login', pathMatch: 'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'setting',component:SettingComponent},
  {path: 'manage-user', component: UserManagementComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'create-election', component: CreateElectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),TooltipModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
