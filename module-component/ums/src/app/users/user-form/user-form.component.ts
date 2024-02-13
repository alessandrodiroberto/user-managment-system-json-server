import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { UserService } from '../../services/user.services';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/IUser';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  public user: User | null = null;
  @Output() updatedUser = new EventEmitter<User>();

  ngOnInit(): void {
    this.route.paramMap.subscribe((p) => {
      const segment = p.get('id'); //null se ha va nella rotta create

      if (segment) {
        const id = Number(segment);
        this.userService.getUser(segment).subscribe((resp) => (this.user = resp));
      } else {
        this.userService.defaultUser().subscribe((resp) => (this.user = resp));
      }
    });
  }

  onSubmitForm(form: NgForm) {
    let obs: Observable<IUser>;

    const userUpdate: User = { ...form.value, id: this.user?.id ?? 0 };

    if (!this.user?.id) {
      obs = this.userService.createUser(form.value);
    } else {
      obs = this.userService.updateUser(userUpdate);
    }

    obs.subscribe((resp) => {
      this.router.navigateByUrl('users');
    });
  }
}
