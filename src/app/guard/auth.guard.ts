import { state } from "@angular/animations";
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
  const loaclUser = localStorage.getItem('empErpUser');
 const router = inject(Router)
  if(loaclUser != null){
    return true;
  } else {
    router.navigateByUrl('/login')
    return false;
  }

};
