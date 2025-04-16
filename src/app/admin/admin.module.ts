import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { InventoryPageComponent } from './pages/inventory-page/inventory-page.component';
import { ProductOrderComponent } from './pages/product-order/product-order.component';
import { AdminNavbarComponent } from './pages/admin-navbar/admin-navbar.component';
import { sharedModule } from '../shared/shared.module';


const adminRoutes:Routes =[
{
    path:'',
    component:AdminComponent,
    children:[
        {path:'',redirectTo:'inventory',pathMatch:'full'},
        {
            path:'inventory', component:InventoryPageComponent
        },
        {path:'dashboard',component:AdminDashboardComponent},
        {
            path:'product-order', component:ProductOrderComponent
        },

    ],
},
];

@NgModule({
  declarations: [
AdminComponent,
AdminDashboardComponent,
InventoryPageComponent,
ProductOrderComponent,
AdminNavbarComponent

  ],
  imports: [
  CommonModule,
  RouterModule.forChild(adminRoutes),
  FormsModule,
  sharedModule
  ],
 
})
export class AdminModule{ }
