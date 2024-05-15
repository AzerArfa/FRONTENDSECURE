import { Component } from '@angular/core';
import { AppelOffre } from '../model/appeloffre.model';
import { AppeloffreService } from '../services/appeloffre.service';
import { ActivatedRoute } from '@angular/router';
import { Entreprise } from '../model/entreprise.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-detailsappeloffre',
  templateUrl: './detailsappeloffre.component.html',
  styleUrls: ['./detailsappeloffre.component.css']
})
export class DetailsappeloffreComponent {
  currentAppelOffre: AppelOffre = new AppelOffre();
  currentEntreprise: Entreprise = new Entreprise();

  constructor(private activatedRoute: ActivatedRoute, 
              private appelofferService: AppeloffreService,
              private userService: UserService) {}

  ngOnInit(): void {
    const offerId = this.activatedRoute.snapshot.params['id'];
    this.loadCurrentAppelOffre(offerId);
  }

  loadCurrentAppelOffre(offerId: string): void {
    this.appelofferService.getAppelOffreByIdUser(offerId).subscribe(appeloffre => {
      this.currentAppelOffre = appeloffre;
      if (appeloffre.entrepriseId) {
        this.loadCurrentEntreprise(appeloffre.entrepriseId);
      }
      console.log('Appel Offre data:', appeloffre);
    }, error => {
      console.error('Error loading offer data:', error);
    });
  }

  loadCurrentEntreprise(entrepriseId: string): void {
    this.userService.getEntrepriseById(entrepriseId).subscribe(entreprise => {
      this.currentEntreprise = entreprise;
    }, error => {
      console.error('Error loading entreprise data:', error);
    });
  }
}
