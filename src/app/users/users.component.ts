import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  allUsers! : User[];
  constructor(private userService: UserService) { }
  nomUser! :string;
  ngOnInit(): void {
    this.userService.listeUsers().subscribe(data => {
      this.users = data;
      this.allUsers = data; // Update allUsers property here
    });
  }

  getImage(img: any): string {
    return 'data:image/jpeg;base64,' + img;
  }

  loadUsers(): void {
    this.userService.listeUsers().subscribe((res) => {
      this.users = res.map(user => {
        console.log('User img:', user.img); // Debug log before modification
        if (user.img && !user.img.startsWith('data:image/jpeg;base64,')) {
          user.img = 'data:image/jpeg;base64,' + user.img;
        }
        console.log(user);
        console.log('Modified user img:', user.img); // Debug log after modification
        return user;
      });
    });
  }

  getRoleNames(user: User): string {
    return user.roles.map(role => role.name).join(', ');
  }

  onKeyUp(filterText : string){
    this.users = this.allUsers.filter(item =>
    item.name?.toLowerCase().includes(filterText));
    }

    rechercherUsers(){
      this.userService.rechercherParNom(this.nomUser).
        subscribe(users => {
      this.users = users; 
      console.log(users)});
    }

    supprimerUser(id: string): void {
      console.log('Deleting user with ID:', id);
      let conf = confirm("Etes-vous sur ?");
      if (conf) {
        this.userService.supprimerUser(id).subscribe(() => {
          console.log('User deleted successfully');
          window.location.reload(); // Reload the page after successful deletion
        }, (error) => {
          console.warn('Error deleting user:', error); // Log as warning instead of error
          window.location.reload(); // Reload the page even if an error occurs
        });
      }
    }
    
    
    
}
