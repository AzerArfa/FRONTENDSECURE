import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-demandecreationentreprise',
  templateUrl: './demandecreationentreprise.component.html',
  styleUrls: ['./demandecreationentreprise.component.css']
})
export class DemandecreationentrepriseComponent  implements OnInit {
  newEntreprise: any = {
    name: '',
    adresse: '',
    secteuractivite: '',
    Matricule: '',
    ville: '',
    siegesociale: '',
    codeTVA: ''
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
    formData.append('name', this.newEntreprise.name);
    formData.append('adresse', this.newEntreprise.adresse);
    formData.append('secteuractivite', this.newEntreprise.secteuractivite);
    formData.append('Matricule', this.newEntreprise.Matricule);
    formData.append('ville', this.newEntreprise.ville);
    formData.append('siegesociale', this.newEntreprise.siegesociale);
    formData.append('codeTVA', this.newEntreprise.codeTVA);

    if (this.selectedFile) {
      formData.append('logo', this.selectedFile, this.selectedFile.name);
    }

    console.log('Form Data to be sent:', (formData as any).entries ? Object.fromEntries((formData as any).entries()) : formData); // Debugging

    this.userService.requestToAddEntreprise(this.userId!, formData).subscribe(
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
