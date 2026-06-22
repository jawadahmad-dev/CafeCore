import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth';
import { Shared } from '../Services/shared';
import { Rest } from '../Services/rest';

export interface User {
  email: string,
  password: string,
  role: string,
  name: string
}

type LoginView = 'login' | 'forgot';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly sharedService = inject(Shared);
  private restService = inject(Rest)

  // Form state
  email = '';
  password = '';
  view = signal<LoginView>('login');
  loading = signal(false);
  showPass = signal(false);


  async onLogin(): Promise<void> {
    if (!this.email.trim() || !this.password.trim()) {
      this.sharedService.toaster('error', 'Required', 'Please enter your email and password.');
      return;
    }

    this.restService.getUsers().then((snapshot) => {
      const usersObj = snapshot.val();
      if (!usersObj) return;
      Object.entries(usersObj).forEach(([key, user]) => {
        let TypedUser = user as User
        if (this.sharedService.DeCrypt(TypedUser.password) === this.password && TypedUser.email === this.email) {
          const payload = {
            email: TypedUser.email,
            role: "admin",
            loggedIn: true,
            name: TypedUser.name
          }
          localStorage.setItem("isLoggedIn", "true")
          this.restService.setLogin(payload);

          this.router.navigate(["/admin"])
        }
        else {
          this.sharedService.toaster("error", "Auth Error", "Invalid Credentials")
        }
      });
    });
  }

}
