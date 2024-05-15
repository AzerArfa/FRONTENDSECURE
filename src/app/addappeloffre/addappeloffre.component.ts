import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppeloffreService } from '../services/appeloffre.service';
import { formatDate } from '@angular/common';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-addappeloffre',
  templateUrl: './addappeloffre.component.html',
  styleUrls: ['./addappeloffre.component.css']
})
export class AddappeloffreComponent implements OnInit{
  newAppelOffre: any = {
    titre: '',
    description: '',
    localisation: '',
    datelimitesoumission: ''
  };
  selectedFile: File | null = null;
  selectedDocument: File | null = null;
  entrepriseId!: string;
  datelimitesoumissionFormatted: string | null = null;

  constructor(
    private  appeloffreService: AppeloffreService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.entrepriseId = params['id'];
    });
  }

  onImageSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  }

  onDocumentSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedDocument = event.target.files[0];
    }
  }

  createAppelOffre(): void {
    const formData = new FormData();
    formData.append('titre', this.newAppelOffre.titre);
    formData.append('description', this.newAppelOffre.description);
    formData.append('localisation', this.newAppelOffre.localisation);
    formData.append('entrepriseId', this.entrepriseId);
    if (this.datelimitesoumissionFormatted) {
      formData.append('datelimitesoumission', this.datelimitesoumissionFormatted);
    }
    if (this.selectedFile) {
      formData.append('img', this.selectedFile, this.selectedFile.name);
    }
    if (this.selectedDocument) {
      formData.append('document', this.selectedDocument, this.selectedDocument.name);
    }

    this.appeloffreService.createAppelOffre(formData).subscribe({
      next: (response) => {
        console.log('Offer created successfully', response);
        this.location.back();
      },
      error: (error) => {
        console.error('Error creating offer', error);
        alert('Failed to create the offer. Check console for details.');
      }
    });
  }
}
