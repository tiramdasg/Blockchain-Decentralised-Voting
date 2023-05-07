import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Implement your authentication logic here
    const isLoggedIn = true; // Check if the user is logged in or has a valid session

    if (!isLoggedIn) {
      // Redirect to the login page if the user is not logged in
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
/**  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  in router module */
