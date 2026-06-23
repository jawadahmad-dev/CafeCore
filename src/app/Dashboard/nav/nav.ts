import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { Rest } from '../../Services/rest';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav implements OnInit {
  readonly restService = inject(Rest);
  readonly router = inject(Router)
  userData: {
    email: string,
    role: string,
    name: string,
    loggedIn: boolean
  } | null = null

  ngOnInit(): void {
    setTimeout(() => {
      this.restService.getLoggedInUser().then((data) => {
        this.userData = data.val();
      });
    });
  }

  logout(): void {
    localStorage.removeItem("isLoggedIn")
    const payload = {
      role: "",
      name: "",
      loggedIn: false,
      email: ""
    }
    this.restService.setLogin(payload);
    this.router.navigateByUrl('/')
  }
}
