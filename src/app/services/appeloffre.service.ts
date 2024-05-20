import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { offerApiURL, userofferApiURL,visitorofferApiURL } from '../config';
import { AppelOffre } from '../model/appeloffre.model';
import { Offre } from '../model/offre.model';
import { Categorie } from '../model/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class AppeloffreService {

 
  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    console.log("Token used: ", token); // Assuming token is stored in local storage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${userofferApiURL}/categories`, { headers: this.getAuthHeaders() });
  }
  getAppelOffresByCategorieId(categorieId: string): Observable<AppelOffre[]> {
    return this.http.get<AppelOffre[]>(`${userofferApiURL}/categories/${categorieId}/appeloffres`, { headers: this.getAuthHeaders() });
  }
  getAllCategoriesVISITOR(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${visitorofferApiURL}/categories`);
  }
  getAppelOffresByCategorieIdVISITOR(categorieId: string): Observable<AppelOffre[]> {
    return this.http.get<AppelOffre[]>(`${visitorofferApiURL}/categories/${categorieId}/appeloffres`, { headers: this.getAuthHeaders() });
  }
  getAllAppelOffresvisitor(): Observable<any[]> {
    return this.http.get<any[]>(`${visitorofferApiURL}/appeloffres`);
  }
 
  getAllAppelOffres(): Observable<AppelOffre[]> {
    return this.http.get<AppelOffre[]>(`${offerApiURL}`, { headers: this.getAuthHeaders() });
  }
  getAllAppelOffresuser(): Observable<AppelOffre[]> {
    return this.http.get<AppelOffre[]>(`${userofferApiURL}`, { headers: this.getAuthHeaders() });
  }
  getAppelOffreById(AppelOffreId: string): Observable<AppelOffre> {
    return this.http.get<AppelOffre>(`${offerApiURL}/${AppelOffreId}`, { headers: this.getAuthHeaders() });
  }
  getAppelOffreByIdUser(AppelOffreId: string): Observable<AppelOffre> {
    return this.http.get<AppelOffre>(`${userofferApiURL}/${AppelOffreId}`, { headers: this.getAuthHeaders() });
  }

  getAppelOffresByEntrepriseId(entrepriseId: string): Observable<AppelOffre[]> {
    return this.http.get<AppelOffre[]>(`${offerApiURL}/entreprises/${entrepriseId}/appeloffres`, { headers: this.getAuthHeaders() });
  }

  createAppelOffre(formData: FormData): Observable<AppelOffre> {
    return this.http.post<any>(`${offerApiURL}`, formData, { headers: this.getAuthHeaders() });
  }

  updateAppelOffreFormData(AppelOffreId: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${offerApiURL}/${AppelOffreId}`, formData, { headers: this.getAuthHeaders() });
  }

  deleteAppelOffreAdmin(AppelOffreId: string): Observable<any> {
    return this.http.delete<any>(`${offerApiURL}/${AppelOffreId}`, { headers: this.getAuthHeaders() });
  }
  createOffreAdmin(appeloffreId: string, formData: FormData): Observable<Offre> {
    return this.http.post<Offre>(`${offerApiURL}/offre/${appeloffreId}`, formData, { headers: this.getAuthHeaders() });
  }

  updateOffreAdmin(id: string, formData: FormData): Observable<Offre> {
    return this.http.put<Offre>(`${offerApiURL}/offre/${id}`, formData, { headers: this.getAuthHeaders() });
  }

  getAllOffresAdmin(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${offerApiURL}/offres`, { headers: this.getAuthHeaders() });
  }

  getOffreByIdAdmin(id: string): Observable<Offre> {
    return this.http.get<Offre>(`${offerApiURL}/offre/${id}`, { headers: this.getAuthHeaders() });
  }

  deleteOffreAdmin(id: string): Observable<any> {
    return this.http.delete<any>(`${offerApiURL}/offre/${id}`, { headers: this.getAuthHeaders() });
  }
  createOffre(appeloffreId: string, formData: FormData): Observable<Offre> {
    return this.http.post<Offre>(`${userofferApiURL}/offre/${appeloffreId}`, formData, { headers: this.getAuthHeaders() });
  }

  updateOffre(id: string, formData: FormData): Observable<Offre> {
    return this.http.put<Offre>(`${userofferApiURL}/offre/${id}`, formData, { headers: this.getAuthHeaders() });
  }

  getAllOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${userofferApiURL}/offres`, { headers: this.getAuthHeaders() });
  }

  getOffreById(id: string): Observable<Offre> {
    return this.http.get<Offre>(`${userofferApiURL}/offre/${id}`, { headers: this.getAuthHeaders() });
  }

  deleteOffre(id: string): Observable<any> {
    return this.http.delete<any>(`${userofferApiURL}/offre/${id}`, { headers: this.getAuthHeaders() });
  }
  getOffresByuserid(id:string): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${userofferApiURL}/offres/user/${id}`, { headers: this.getAuthHeaders() });
  }
  getOffresByuseridadmin(id:string): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${offerApiURL}/offres/admin/${id}`, { headers: this.getAuthHeaders() });
  }
  getOffresByappeloffresidadmin(id:string): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${offerApiURL}/offres/appeloffre/${id}`, { headers: this.getAuthHeaders() });
  }

  downloadDocument(offreId: string): Observable<Blob> {
    const headers = this.getAuthHeaders();
    // Adjust the response type to 'blob' to handle the PDF binary data
    return this.http.get(`${offerApiURL}/offres/download/${offreId}`, { headers: headers, responseType: 'blob' });
  }

  downloadDocumentAppelOffre(offreId: string): Observable<Blob> {
    const headers = this.getAuthHeaders();
    // Adjust the response type to 'blob' to handle the PDF binary data
    return this.http.get(`${userofferApiURL}/offres/download/${offreId}`, { headers: headers, responseType: 'blob' });
  }
  downloadDocumentAppelOffreAdmin(offreId: string): Observable<Blob> {
    const headers = this.getAuthHeaders();
    // Adjust the response type to 'blob' to handle the PDF binary data
    return this.http.get(`${offerApiURL}/appeloffres/download/${offreId}`, { headers: headers, responseType: 'blob' });
  }
}
