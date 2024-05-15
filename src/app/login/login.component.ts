import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { email: '', password: '' };
  err = 0;

  constructor(private authService: AuthService, private router: Router) { }

  Login(): void {
    console.log('Attempting to log in with user:', this.user); // Log the user attempting to log in
    this.authService.login(this.user).subscribe(
      response => {
        console.log('Login successful:', response); // Log the successful login response
        this.router.navigate(['/users']); // Redirect to the users page after login
      },
      error => {
        console.log('Login error:', error); // Log any login error
        this.err = 1;
      }
    );
  }
}
