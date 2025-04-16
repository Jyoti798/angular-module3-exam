import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { sharedModule } from '../shared/shared.module';


const authRoutes:Routes =[
{
    path:'',
    component:AuthComponent,
    children:[
        {path:'',redirectTo:'login',pathMatch:'full'},
        {
            path:'login', component:LoginComponent
        },
        {path:'register',component:RegistrationComponent}
    ],
},
];

@NgModule({
  declarations: [
AuthComponent,
LoginComponent,
RegistrationComponent
  ],
  imports: [
  CommonModule,
  RouterModule.forChild(authRoutes),
  FormsModule,
  sharedModule
  ],
 
})
export class AuthModule{ }
