import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent  { 
  
  newUser: User = new User();
  selectedFile: File | null = null;  // Allow null as a valid value
  captcha: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  resolved(captchaResponse: string) {
    this.captcha = true;
  }

  onSubmit(): void {
    const formData: FormData = new FormData();
    formData.append('cin', this.newUser.cin);
    formData.append('email', this.newUser.email);
    formData.append('name', this.newUser.name);
    
    // Format the date properly
    const formattedDate = this.formatDate(new Date(this.newUser.datenais));
    formData.append('datenais', formattedDate);
    
    formData.append('lieunais', this.newUser.lieunais);
    formData.append('password', this.newUser.password);
    if (this.selectedFile) {
      formData.append('img', this.selectedFile, this.selectedFile.name);
    }

    this.userService.signup(formData).subscribe(response => {
      console.log('User signed up successfully', response);
      this.router.navigate(['/login']);
    }, error => {
      console.error('Error signing up user', error);
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add 1 because months are zero-indexed
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
