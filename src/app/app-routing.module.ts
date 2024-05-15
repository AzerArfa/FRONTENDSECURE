import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { AddentrepriseComponent } from './addentreprise/addentreprise.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UpdateEntrepriseComponent } from './update-entreprise/update-entreprise.component';
import { AddappeloffreComponent } from './addappeloffre/addappeloffre.component';
import { DetailsappeloffreComponent } from './detailsappeloffre/detailsappeloffre.component';
import { AppeloffresadminComponent } from './appeloffresadmin/appeloffresadmin.component';
import { UpdateappeloffreComponent } from './updateappeloffre/updateappeloffre.component';

const routes: Routes = [
  {path:"addAppelOffre/:id",component:AddappeloffreComponent},
  {path:"detailsAppelOffre/:id",component:DetailsappeloffreComponent},
  {path:"appeloffresadmin/:id",component:AppeloffresadminComponent},
  {path:"home", component:HomeComponent},
  {path:"about", component:AboutComponent},
  {path:"users",component:UsersComponent},
  {path:"login", component:LoginComponent},
  {path:"addUser",component:AddUserComponent},
  {path:"signUp",component:SignUpComponent},
  {path: "updateUser/:id", component: UpdateUserComponent},
  {path:"updateappeloffre/:id",component:UpdateappeloffreComponent},
  {path:"updateEntreprise/:id",component:UpdateEntrepriseComponent},
  {path:"profile/:id",component:ProfileComponent},
  { path: 'navbar', component: NavbarComponent } ,
  {path:"addentreprise/:id",component:AddentrepriseComponent},
  {path:"", redirectTo:"home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
