import { Component, ElementRef, OnInit, QueryList, ViewChildren, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.services';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/IUser';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  router = inject(Router);
  userService = inject(UserService);

  public users$: Observable<IUser[]> = this.userService.getUsers(); //Per convenzione $

  //@ViewChildren(UserDetailsComponent, {read: ElementRef}) trs!: QueryList<UserDetailsComponent>;

  /*
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', this.trs);
    this.trs.forEach((itm) => console.log(itm));
  }

  */

  deleteUser(user: IUser): void {
    this.userService.deleteUser(user.id).subscribe((resp) => {
      //location.reload(); //ricarica la pagina
      this.reloadUsers(); //aggiorna gli users con una nuova chiamata http
     /* this.trs.forEach(itm=> {
        //itm.nativeElement
      });*/
    });
  }

  private reloadUsers() {
    this.users$ = this.userService.getUsers();
  }
}
