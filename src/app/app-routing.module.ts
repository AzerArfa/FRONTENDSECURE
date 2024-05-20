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
import { AddoffreComponent } from './addoffre/addoffre.component';
import { DetailsappeloffreadminComponent } from './detailsappeloffreadmin/detailsappeloffreadmin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './guards/auth.guard';
import { SuperAdminGuard } from './guards/superadmin.guard';
import { ActionentrepriseComponent } from './actionentreprise/actionentreprise.component';
import { DemandecreationentrepriseComponent } from './demandecreationentreprise/demandecreationentreprise.component';
import { DemanderejointentrepriseComponent } from './demanderejointentreprise/demanderejointentreprise.component';
import { HomevisitorComponent } from './homevisitor/homevisitor.component';
import { ListentreprisesComponent } from './listentreprises/listentreprises.component';



const routes: Routes = [
  {path:"addOffre/:id",component:AddoffreComponent},
  {path:"listentreprises",component:ListentreprisesComponent},
  {path:"demandecreationentreprise",component:DemandecreationentrepriseComponent,canActivate: [AuthGuard]},
  {path:"demanderejointentreprise",component:DemanderejointentrepriseComponent,canActivate: [AuthGuard]},
  {path:"actionentreprise",component:ActionentrepriseComponent,canActivate: [AuthGuard]},
  {path:"forbidden",component:ForbiddenComponent},
  {path:"addAppelOffre/:id",component:AddappeloffreComponent},
  {path:"detailsAppelOffre/:id",component:DetailsappeloffreComponent},
  {path:"detailsAppelOffreAdmin/:id",component:DetailsappeloffreadminComponent},
  {path:"appeloffresadmin/:id",component:AppeloffresadminComponent},
  {path:"home", component:HomeComponent ,canActivate: [AuthGuard]},
  {path:"about", component:AboutComponent},
  {path:"users",component:UsersComponent,canActivate: [SuperAdminGuard]},
  {path:"login", component:LoginComponent},
  {path:"addUser",component:AddUserComponent},
  {path:"signUp",component:SignUpComponent},
  {path: "updateUser/:id", component: UpdateUserComponent},
  {path:"updateappeloffre/:id",component:UpdateappeloffreComponent},
  {path:"updateEntreprise/:id",component:UpdateEntrepriseComponent},
  {path:"profile/:id",component:ProfileComponent},
  { path: 'navbar', component: NavbarComponent } ,
  { path: 'homevisitor', component: HomevisitorComponent } ,
  { path: '', component: HomevisitorComponent } ,
  {path:"addentreprise/:id",component:AddentrepriseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
