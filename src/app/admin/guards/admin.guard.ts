import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ManageService } from 'src/app/auth/services/manage.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const manageService=inject(ManageService);
  const router=inject(Router);
  const user=manageService.getUser();
  if(user &&user.type=='admin'){
    return true;
  }
  else if(user&&user.type==='user'){
    return router.createUrlTree(['/user']);
  }
return router.createUrlTree(['/auth']);
};
