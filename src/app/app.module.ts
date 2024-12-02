import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { UserListComponent } from './core/user/user-list/user-list.component';
import { AddEditUserComponent } from './core/user/user-list/add-edit-user/add-edit-user.component';
import { LoginComponent } from './core/authentication/login/login.component';
import { InterceptorService } from './shared/services/interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './core/authentication/auth.service';
import { UserService } from './core/user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    UserListComponent,
    AddEditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // Required for Toastr animations
    ToastrModule.forRoot({
      timeOut: 3000, // Notification duration (milliseconds)
      positionClass: 'toast-top-right', // Notification position
      preventDuplicates: true, // Prevent duplicate notifications
      progressBar: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    AuthService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
