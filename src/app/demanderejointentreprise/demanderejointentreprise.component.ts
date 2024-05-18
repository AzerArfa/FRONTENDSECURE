import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-demanderejointentreprise',
  templateUrl: './demanderejointentreprise.component.html',
  styleUrls: ['./demanderejointentreprise.component.css']
})
export class DemanderejointentrepriseComponent  implements OnInit {
  joinrequest: any = {
    entrepriseMatricule: '',
  };
  selectedFile: File | null = null;
  userId!: string | null;

  

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private authservice:AuthService
  ) {}

  ngOnInit(): void {
    this.authservice.getUserId().subscribe(id => {
      this.userId = id;
      console.log('User ID:', this.userId); // For debugging purposes
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    const formData: FormData = new FormData();

    formData.append('entrepriseMatricule', this.joinrequest.entrepriseMatricule);
  

  

    console.log('Form Data to be sent:', (formData as any).entries ? Object.fromEntries((formData as any).entries()) : formData); // Debugging

    this.userService.requestToJoinEntreprise(this.userId!, formData).subscribe(
      response => {
        console.log('Request added successfully:', response);
        this.router.navigate([`/profile/${this.userId}`]);
      },
      error => {
        console.error('Error adding Request:', error);
        if (error.error) {
          console.error('Backend returned error message:', error.error);
        }
        if (error.status === 200) {
          console.error('Received status 200, but there was an error in the response.');
        }
      }
    );
  }
}