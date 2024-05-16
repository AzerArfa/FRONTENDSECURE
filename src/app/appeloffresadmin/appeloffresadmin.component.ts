import { Component, OnInit } from '@angular/core';
import { AppelOffre } from '../model/appeloffre.model';
import { AppeloffreService } from '../services/appeloffre.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appeloffresadmin',
  templateUrl: './appeloffresadmin.component.html',
  styleUrls: ['./appeloffresadmin.component.css']
})
export class AppeloffresadminComponent implements OnInit {
  appeloffres: AppelOffre[] = [];
  isLoading = true; // Track loading state
  entrepriseId: string | null = null;

  constructor(private appeloffreService: AppeloffreService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.entrepriseId = params['id']; // Directly set entrepriseId from route parameters
      if (this.entrepriseId) {
        this.getAppelOffresByEntreprise(this.entrepriseId);
      }
    });
  }

  supprimerAppelOffre(id: string): void {
    let conf = confirm("Etes-vous sur ?");
    if (conf) {
      this.appeloffreService.deleteAppelOffreAdmin(id).subscribe(() => {
        console.log('Appel doffre supprimé');
        window.location.reload(); // Reload the page after successful deletion
      }, (error) => {
        console.warn(error); // Log as warning instead of error
        window.location.reload(); // Reload the page even if an error occurs
      });
    }
  }

  private getAppelOffresByEntreprise(entrepriseId: string): void {
    this.appeloffreService.getAppelOffresByEntrepriseId(entrepriseId).subscribe({
      next: (appeloffres) => {
        this.appeloffres = appeloffres;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load offers:', error);
        this.isLoading = false;
      }
    });
  }
}

