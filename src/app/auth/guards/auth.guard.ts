import { CanActivateFn, Router } from '@angular/router';
import { ManageService } from '../services/manage.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
const manageService=inject(ManageService);
const router=inject(Router);


const user=manageService.getUser();
if(user){
  return true;
}
return router.createUrlTree(['/auth']);

};
