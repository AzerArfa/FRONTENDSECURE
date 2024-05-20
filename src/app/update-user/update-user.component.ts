import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  currentUser: any = {
    email: '',
    name: '',
    prenom:'',
    cin: '',
    datenais: '',
    lieunais: ''
  };
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const userId = params['id'];
      this.userService.getUserById(userId).subscribe(
        (data: any) => {
          this.currentUser = data;
          
          if (this.currentUser.datenais) {
            const date = new Date(this.currentUser.datenais);
            if (!isNaN(date.getTime())) {
              this.currentUser.datenais = this.formatDate(date);
            } else {
              console.error('Invalid date format:', this.currentUser.datenais);
            }
          }
          if (this.currentUser.img) {
            // Assuming 'img' is a Base64 encoded string
            this.currentUser.imgUrl = `data:image/jpeg;base64,${this.currentUser.img}`;
          }
        },
        error => console.error(error)
      );
    });
  }
  

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  updateUser(): void {
    if (!this.currentUser) {
      console.error('No current user data available');
      return;
    }
  
    const formData: FormData = new FormData();
    formData.append('email', this.currentUser.email);
    formData.append('name', this.currentUser.name);
    formData.append('prenom', this.currentUser.prenom);
    formData.append('cin', this.currentUser.cin);
    formData.append('datenais', this.currentUser.datenais);
    formData.append('lieunais', this.currentUser.lieunais);
  
    if (this.selectedFile) {
      formData.append('img', this.selectedFile, this.selectedFile.name);
    }
  
    // Ensure no Content-Type header is manually set here
    this.userService.updateUser(this.currentUser.id, formData).subscribe(
      (response: any) => {
        console.log('Update successful', response);
        this.router.navigate([`/profile/${this.currentUser.id}`]);
      },
      error => {
        console.error('Error updating user', error);
      }
    );
  }
  
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      // A new file has been selected
      this.selectedFile = event.target.files[0];
    } else {
      // No new file was selected, reset selectedFile to null
      this.selectedFile = null;
    }
  }
  
}
