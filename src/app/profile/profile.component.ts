import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

import { AppeloffreService } from '../services/appeloffre.service';
import { AuthService } from '../services/auth.service';
import { DemandeAjoutEntreprise } from '../model/demandeajoutentreprise.model';
import { DemandeRejoindreEntreprise } from '../model/demanderejoindreentreprise.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser = new User();
  isAdmin!: boolean;
  isSuperAdmin!:boolean;
  creationRequests: DemandeAjoutEntreprise[] = [];
  joinRequests: DemandeRejoindreEntreprise[] = [];

  
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,private authService:AuthService,
    private appeloffreService: AppeloffreService,private toastr:ToastrService ) {}

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.params['id'];
    this.loadCurrentUser(userId);
    this.isAdmin = this.authService.isAdmin(); 
    this.isSuperAdmin=this.authService.isSuperAdmin();
    console.log(this.isSuperAdmin);
    this.loadCreationRequests();
    this.loadJoinRequests();
  }
  loadCreationRequests(): void {
    this.userService.getAllCreationRequests().subscribe({
      next: (requests) => {
        this.creationRequests = requests;
      },
      error: (err) => console.error('Failed to fetch creation requests:', err)
    });
  }
  approveCreation(requestId: string, userId: string) {
    this.userService.approveCreationRequest(requestId, userId).subscribe({
      next: (response) => {
          console.log('Creation request approved successfully:', response);
          this.loadCreationRequests();
          // Optionally refresh the list or update the UI
      },
      error: (error) => {
          console.error('Failed to approve creation request:', error);
          const errorMessage = error.error.error || error.message;
          console.log('Error message from the server:', errorMessage);
          // Display an error message to the user
      }
  });
  
}

// Example of calling rejectCreationRequest
rejectCreation(requestId: string) {
    this.userService.rejectCreationRequest(requestId).subscribe({
        next: () => {console.log('Creation request rejected successfully.');
        this.loadCreationRequests();
        }
        ,
        error: error => console.error('Failed to reject creation request:', error)
    });
}
  approveJoin(requestId: string) {
    this.userService.approveJoinRequest(requestId).subscribe({
      next: response => {
          console.log('Join request approved:', response);
          this.loadJoinRequests();
      },
      error: error => {
          console.error('Failed to approve join request', error);
          console.log('Error response:', error.error.text); // Logging the error response body
      }
  });
  
  }
  
  rejectJoin(requestId: string) {
    this.userService.rejectJoinRequest(requestId).subscribe({
      next: response => {
        console.log('Join request rejected');
        this.loadJoinRequests();
        // Optionally refresh the list of join requests or handle UI updates here
      },
      error: err => console.error('Failed to reject join request', err)
    });
  }
  loadJoinRequests(): void {
    this.authService.getUserId().subscribe(userId => {
        if (userId) {
            this.userService.getAllJoinRequests(userId).subscribe({
                next: (requests) => {
                    this.joinRequests = requests;
                    this.joinRequests.forEach(request => {
                        this.userService.getUserById(request.userId).subscribe(user => {
                            request.userName = user.name;
                            request.userCIN = user.cin;
                            request.userImg = user.img;
                        });
                    });
                },
                error: (err) => console.error('Failed to fetch join requests:', err)
            });
        } else {
            console.error('User ID not found, unable to fetch join requests');
        }
    });
}
  loadCurrentUser(userId: string): void {
    this.userService.getUserById(userId)
      .subscribe(user => {
        this.currentUser = user;
        console.log('User data:', user);
      }, error => {
        console.error('Error loading user data:', error);
      });
  }

  formatDate(date: Date): string {
    if (!date) {
      return '';
    }

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      console.error('Invalid date:', date);
      return '';
    }
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: 'long', day: 'numeric'
    };
    return new Intl.DateTimeFormat('fr-FR', options).format(dateObj);
  }

  supprimerEntreprise(id: string): void {
    if (this.authService.isAdmin()) {
      console.log('Checking appeloffres for entreprise with ID (admin):', id);
      this.appeloffreService.getAppelOffresByEntrepriseId(id).subscribe(appeloffres => {
        if (appeloffres && appeloffres.length > 0) {
          this.toastr.error('Vous devez supprimer les offres associés à cette entreprise avant de pouvoir la supprimer.', 'Erreur', {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-right',
        });
        
        } else {
          this.deleteEntreprise(id);
        }
      }, error => {
        console.warn('Error checking appeloffres for entreprise (admin):', error);
      });
    } else {
      console.log('Directly deleting entreprise without checking appeloffres (non-admin):', id);
      this.deleteEntreprise(id);
    }
  }
  

  
  deleteEntreprise(id: string): void {
    let conf = confirm("Êtes-vous sûr de vouloir supprimer cette entreprise ?");
    if (conf) {
      this.userService.supprimerEntreprise(id).subscribe(() => {
        console.log('Entreprise deleted successfully');
        window.location.reload(); // Reload the page after successful deletion
      }, (error) => {
        console.warn('Error deleting entreprise:', error);
        window.location.reload(); // Reload the page even if an error occurs
      });
    }
  }
}
