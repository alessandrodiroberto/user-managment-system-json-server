import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { User, UserService } from '../user.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  router = inject(Router);
  userService = inject(UserService);
  users: User[] = [];

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  deleteUser(user: User): void {
    this.userService.userDeleted.next(user);
  }
}
