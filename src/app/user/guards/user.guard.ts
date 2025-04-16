import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ManageService } from 'src/app/auth/services/manage.service';

export const userGuard: CanActivateFn = (route, state) => {
 const manageService=inject(ManageService);
  const router=inject(Router);
  const user=manageService.getUser();
  if(user &&user.type=='user'){
    return true;
  }
  else if(user&&user.type==='admin'){
    return router.createUrlTree(['/admin']);
  }
return router.createUrlTree(['/auth']);
};
