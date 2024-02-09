import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';

const routes: Routes = [
  {
    path: 'users', //quando visito la pagina /users..
    component: UsersListComponent, //....mostro il component
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full', //cerca esattamente il percorso '' (vuoto). Cos' se si a nella home, in realtà va su users
  },
  {
    path: 'users/create',
    component: UserFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'users/:id/show',
    component: UserDetailsComponent,
  },
  {
    path: 'users/:id',
    component: UserFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
