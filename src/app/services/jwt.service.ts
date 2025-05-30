import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  // Method to decode the token and extract the UserId
  getUserIdFromToken(token: string): string | null {
    try {
      const decodedToken: any = jwtDecode(token); // Attempt to decode the token
      return decodedToken?.UserId || null; // Return the UserId if it exists
    } catch {
      return null;
    }
  }

  getUserNameFromToken(token: string): string | null {
    try {
      const decodedToken: any = jwtDecode(token); // Attempt to decode the token
      return decodedToken?.unique_name || null; // Return the UserId if it exists
    } catch {
      return null;
    }
  }

 
}