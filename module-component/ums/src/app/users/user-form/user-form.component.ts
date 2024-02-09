import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { User, UserService } from '../../services/user.services';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  user: User | null = null; //fai observable!!
  @Output() updatedUser = new EventEmitter<User>();

  ngOnInit(): void {
    this.route.paramMap.subscribe((p) => {
      const segment = p.get('id'); //null se ha va nella rotta create

      if (segment) {
        const id = Number(segment);
        this.userService.getUser(id).subscribe((resp) => (this.user = resp));
      } else {
        this.user = this.userService.defaultUser();
      }
    });
  }

  onSubmitForm(form: NgForm) {
    const userUpdate: User = { ...form.value, id: this.user?.id ?? 0 };

    if (!this.user?.id) {
      this.userService.userAdded.next(form.value);
    } else {
      //this.userService.updateUser(userUpdate);
      this.userService.userUpdated.next(userUpdate);
    }

    this.router.navigateByUrl('users');
    //form.reset();
  }
}
