import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';
import { authApiURL } from '../config';
import { Entreprise } from '../model/entreprise.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = authApiURL + '/user';

  public isupdatedSubject = new BehaviorSubject<boolean>(false);
  public isupdated = this.isupdatedSubject.asObservable();

  userUpdated: EventEmitter<User> = new EventEmitter<User>();
  users!: User[];
  user!: User;

  constructor(private http: HttpClient, private authService: AuthService) { }

  listeUsers(): Observable<User[]> {
    return this.http.get<User[]>(authApiURL + '/users');
  }

  ajouterUser(user: User): Observable<User> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.post<User>(authApiURL + "/signup", user, { headers: httpHeaders });
  }

  signup(formData: FormData): Observable<User> {
    return this.http.post<User>(authApiURL + '/signup', formData)
  }
  
   addEntreprise(userId: string, formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/${userId}/add-entreprise`;
    return this.http.post<any>(url, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }
  

  supprimerUser(id: string): Observable<User> {
    return this.http.delete<User>(`${authApiURL}/delete/${id}`);
  }

  supprimerEntreprise(id: string): Observable<Entreprise> {
    return this.http.delete<Entreprise>(`${authApiURL}/entreprise/${id}`);
  }

  consulterUser(id: string): Observable<User> {
    return this.http.get<User>(`${authApiURL}/user/${id}`);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${authApiURL}/user/${userId}`).pipe(
      tap(user => {
        console.log('Fetched User:', user);
        return user;
      })
    );
  }

  trierUsers() {
    this.users = this.users.sort((n1, n2) => {
      if (n1.id! > n2.id!) {
        return 1;
      } if (n1.id! < n2.id!) {
        return -1;
      }
      return 0;
    });
  }

  // UserService
updateUser(id: string, formData: FormData): Observable<any> {
  const url = `${authApiURL}/updateuser/${id}`;
  return this.http.put(url, formData).pipe(
    tap((updatedUser: any) => {
      console.log('Updated user from backend:', updatedUser);
      if (id === this.authService.getUserInfo().userId) {  // Ensure only to update when the IDs match
        this.authService.updateUserInfo(updatedUser);
        console.log('User info refreshed with new data.');
      }
    })
  );
}

  getEntrepriseById(id: string): Observable<Entreprise> {
    return this.http.get<Entreprise>(`${authApiURL}/entreprise/${id}`);
  }

  updateEntreprise(id: string, entrepriseData: FormData): Observable<Entreprise> {
    return this.http.put<Entreprise>(`${authApiURL}/entreprise/${id}`, entrepriseData);
  }

  rechercherParNom(term: string): Observable<any> {
    return this.http.get(`${authApiURL}/users/${term}`);
  }
}
