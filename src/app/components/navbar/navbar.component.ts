import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CookieService } from '../../services/cookie.service';
import { User } from '../../interfaces/users';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})


export class NavbarComponent implements OnInit {

  constructor(private cookieService: CookieService, private jwt: JwtService) { }

  logoPath: string = 'assets/images/logo2.jpg';
  entrou: boolean = false;
  userName: string = "";
  isLoading: boolean = true;

  ngOnInit(): void {
    const name = this.jwt.getUserNameFromToken(this.cookieService.getCookie('authToken'));
    this.entrou = !!name;
    this.isLoading = false;

  }

  logout() : void {
    this.cookieService.deleteCookie('authToken');
    this.entrou = false;
  }


}
