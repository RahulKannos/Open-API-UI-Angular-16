import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/authentication/login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { UserListComponent } from './core/user/user-list/user-list.component';
import { AddEditUserComponent } from './core/user/user-list/add-edit-user/add-edit-user.component';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'userList', component: UserListComponent },
      { path: 'addUser', component: AddEditUserComponent },
      { path: 'editUser/:id', component: AddEditUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
