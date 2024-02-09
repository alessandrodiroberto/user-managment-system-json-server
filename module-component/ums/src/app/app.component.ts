import { Component, OnDestroy, inject } from '@angular/core';
import { User, UserService } from './services/user.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  title = 'User Managment System';
  userService = inject(UserService);

  private userUpdatedSub: Subscription;
  private userDeletedSub: Subscription;
  private userCreated: Subscription;

  constructor() {
    this.userUpdatedSub = this.userService.userUpdated.subscribe((u) => {
      this.onUserUpdated(u);
    });
    this.userDeletedSub = this.userService.userDeleted.subscribe((u) => {
      this.onDeletedUser(u);
    });
    this.userCreated = this.userService.userAdded.subscribe((u) => {
      this.onUserCreated(u);
    });
  }

  ngOnDestroy(): void {
    this.userUpdatedSub.unsubscribe();
    this.userDeletedSub.unsubscribe();
    this.userCreated.unsubscribe();
  }

  private onDeletedUser(user: User): void {
    this.userService.deleteUser(user);
  }

  private onUserUpdated(user: User) {
    this.userService.updateUser(user);
  }

  private onUserCreated(user: User) {
    this.userService.createUser(user);
  }
}
