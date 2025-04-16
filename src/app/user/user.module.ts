import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { CartDetailComponent } from './pages/cart-detail/cart-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderTrackingComponent } from './pages/order-tracking/order-tracking.component';
import { UserNavbarComponent } from './pages/user-navbar/user-navbar.component';

import { AdminDashboardComponent } from '../admin/pages/admin-dashboard/admin-dashboard.component';
import { sharedModule } from '../shared/shared.module';


const userRoutes:Routes =[
{
    path:'',
    component:UserComponent,
    children:[
        {path:'',redirectTo:'cartdetail',pathMatch:'full'},
        {
            path:'cartdetail', component:CartDetailComponent
        },
        {path:'cart',component:CartComponent},
        {
            path:'track-order', component:OrderTrackingComponent
        },
        {path:'dashboard', component:AdminDashboardComponent}

    ],
},
];

@NgModule({
  declarations: [
UserComponent,
CartDetailComponent,
CartComponent,
OrderTrackingComponent,
UserNavbarComponent

  ],
  imports: [
  CommonModule,
  RouterModule.forChild(userRoutes),
  FormsModule,
  sharedModule
  ],
 
})
export class UserModule{ }
