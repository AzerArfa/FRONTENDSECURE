import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-entreprise',
  templateUrl: './update-entreprise.component.html',
  styleUrls: ['./update-entreprise.component.css']
})
export class UpdateEntrepriseComponent implements OnInit{

  
  currentEntreprise = {
    name: '',
    adresse: '',
    secteuractivite: '',
    matricule: '',
    ville: '',
    siegesociale: '',
    codeTVA: '',
    logo: null
  };
  userInfo: any;  
  constructor(private userService : UserService, private authService: AuthService, private activatedRoute : ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.userService.getEntrepriseById(id).subscribe(
        data => {
          this.currentEntreprise = data;
        },
        error => console.error(error)
      );
    });

    // Retrieve the user info from AuthService
    this.userInfo = this.authService.getUserInfo();
  }

  onFileSelected(event: any) {
    this.currentEntreprise.logo = event.target.files[0];
  }

  updateEntreprise() {
    const formData = new FormData();
    formData.append('name', this.currentEntreprise.name);
    formData.append('adresse', this.currentEntreprise.adresse);
    formData.append('secteuractivite', this.currentEntreprise.secteuractivite);
    formData.append('Matricule', this.currentEntreprise.matricule);
    formData.append('ville', this.currentEntreprise.ville);
    formData.append('siegesociale', this.currentEntreprise.siegesociale);
    formData.append('codeTVA', this.currentEntreprise.codeTVA);
    // Append other fields similarly
    if (this.currentEntreprise.logo) {
      formData.append('logo', this.currentEntreprise.logo);
    }

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.userService.updateEntreprise(id, formData).subscribe(
        () => {
          // Redirect to the user's profile page using the userId from userInfo
          this.router.navigate(['/profile', this.userInfo.userId]);
        },
        error => console.error(error)
      );
    });
  }


  

}
