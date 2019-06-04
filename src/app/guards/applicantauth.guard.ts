import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ApplicantauthGuard implements CanActivate {
  constructor(private route: Router, private snackBar: MatSnackBar) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (sessionStorage.getItem('userType') === 'applicant') {
        return true;
      } else {
        this.route.navigateByUrl('/login');
        this.snackBar.open("You are not authorized! Please login first!", "close", {
          duration: 3500
        });
        return false;
      }
  }
}
