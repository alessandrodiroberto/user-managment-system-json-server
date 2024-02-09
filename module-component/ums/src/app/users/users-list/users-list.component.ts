import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../services/user.services';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  router = inject(Router);
  userService = inject(UserService);

  public users$: Observable<User[]> = this.userService.getUsers();  //Per convenzione $

  ngOnInit(): void {
    //this.userService.getUsers().subscribe(resp => this.users = resp);
  }

  deleteUser(user: User): void {
    this.userService.userDeleted.next(user);
  }
}
