import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
// import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { UserComponent } from './user/user.component';
// import { AdminModule } from './admin/admin.module';


@NgModule({
  declarations: [
    AppComponent,
 
    UserComponent,
    
   
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
  
    HttpClientModule,
    AppRoutingModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
