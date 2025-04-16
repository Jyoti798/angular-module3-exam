import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { adminGuard } from './admin/guards/admin.guard';
import { userGuard } from './user/guards/user.guard';

const routes:Routes =[
{path:'', redirectTo:'auth' ,pathMatch:'full'},
   {path:'auth',
    loadChildren:()=>
        import('./auth/auth.module').then((m)=>m.AuthModule),
   },
   
   {path:'admin',
    loadChildren:()=>
        import('./admin/admin.module').then((m)=>m.AdminModule),
    canActivate:[authGuard,adminGuard]
   },
   {path:'user',
    loadChildren:()=>
        import('./user/user.module').then((m)=>m.UserModule),
    canActivate:[authGuard,userGuard]
   },

{path:'**',redirectTo:'auth'},
];

@NgModule({
 
  imports: [
 
  RouterModule.forRoot(routes),

  ],
  exports:[RouterModule]
 
})
export class AppRoutingModule{ }
