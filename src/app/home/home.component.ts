
import { Component, OnInit } from '@angular/core';
import { AppeloffreService } from '../services/appeloffre.service';
import { AppelOffre } from '../model/appeloffre.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appeloffres: AppelOffre[] = [];
  isLoading = true; // Track loading state

  constructor(private appeloffreService: AppeloffreService) {}

  ngOnInit(): void {
    this.loadAllappeloffres();
  }

  private loadAllappeloffres(): void {
    this.appeloffreService.getAllAppelOffresuser().subscribe({
      next: (appeloffres) => {
        this.appeloffres = appeloffres;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load all appeloffres:', error);
        this.isLoading = false;
      }
    });
  }
}
