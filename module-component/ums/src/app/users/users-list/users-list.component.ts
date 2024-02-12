import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.services';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  router = inject(Router);
  userService = inject(UserService);

  public users$: Observable<IUser[]> = this.userService.getUsers(); //Per convenzione $

  deleteUser(user: IUser): void {
    this.userService.deleteUser(user);
  }
}
