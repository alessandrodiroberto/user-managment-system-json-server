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
  //providers: [UserService], //se abilitato, verrà creata una istanza per ogni component app-users-list in app.component.html
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  //@Output() userDeleted = new EventEmitter<User>();

  router = inject(Router);
  userService = inject(UserService);
  users: User[] = [];

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  deleteUser(user: User): void {
    //this.userDeleted.emit(user);  //now with Subscription
    this.userService.userDeleted.next(user);
  }

  updateUser(user: User): void {/*Check html*/}
}
