import { Injectable } from '@angular/core';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor(private cookieService: NgxCookieService) {}

  // Set a cookie
  setCookie(name: string, value: string, days: number): void {
    const expires = days; // Expiration in days
    this.deleteCookie(name);
    this.cookieService.set(name, value, expires, '/', '', true, 'Strict');
  }

  // Get a cookie
  getCookie(name: string): string {
    return this.cookieService.get(name);
  }

  // Delete a cookie
  deleteCookie(name: string): void {
    this.cookieService.delete(name, '/', '');
  }

  // Check if a cookie exists
  checkCookie(name: string): boolean {
    return this.cookieService.check(name);
  }
}