import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegistrationComponent } from './auth/components/registration/registration.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AdminDashboardComponent } from './admin/pages/admin-dashboard/admin-dashboard.component';
import { ProductOrderComponent } from './admin/pages/product-order/product-order.component';
import { InventoryPageComponent } from './admin/pages/inventory-page/inventory-page.component';
import { AdminNavbarComponent } from './admin/pages/admin-navbar/admin-navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    AdminDashboardComponent,
    ProductOrderComponent,
    InventoryPageComponent,
    AdminNavbarComponent,
   
   
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
