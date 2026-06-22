import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './Services/auth';
import { Rest } from './Services/rest';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const restService = inject(Rest)
  let loggedInUser = null;
  return restService.getLoggedInUser().then((data) => {
    const dbData = data.val()
    if (dbData.loggedIn === true && dbData.role === 'admin' && localStorage.getItem('isLoggedIn') === "true") {
      return true
    }
    else {
      router.navigateByUrl('/login')
      return false
    }
  })

};
