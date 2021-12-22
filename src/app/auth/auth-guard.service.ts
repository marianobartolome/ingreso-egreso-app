import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

import { take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(public authService:AuthService) { }

  canLoad() {
    return this.authService.isAuth()
      .pipe(
        take(1)
      );
  }

  canActivate() {
      
      return this.authService.isAuth();
  }
}
