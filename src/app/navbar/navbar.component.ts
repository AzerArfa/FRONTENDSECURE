import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userInfo: any;
  isloggedIn: boolean = false;
  private userInfoSubscription?: Subscription;

  constructor(
    public authService: AuthService, 
    private router: Router, 
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refreshNavbar();

    this.authService.userInfo.subscribe(userInfo => {
      this.userInfo = userInfo;
      console.log('Navbar user info updated:', this.userInfo);
      this.cdr.detectChanges(); // Manually trigger change detection
    });

    this.authService.isloggedIn.subscribe(isLoggedIn => {
      this.isloggedIn = isLoggedIn;
      this.cdr.detectChanges(); // Manually trigger change detection
    });

    this.userService.userUpdated.subscribe(updatedUser => {
      console.log(updatedUser);
      this.userInfo = updatedUser;
      this.cdr.detectChanges(); // Manually trigger change detection
      console.log('Navbar user updated:', this.userInfo);
    });

    // Initialize with current state
    this.userInfo = this.authService.getUserInfo();
    this.isloggedIn = this.authService.isloggedInState;
  }

  refreshNavbar(): void {
    this.userInfo = this.authService.getUserInfo();
    this.isloggedIn = this.authService.isloggedInState;
    console.log('Navbar refreshed:', this.userInfo);
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }
}
