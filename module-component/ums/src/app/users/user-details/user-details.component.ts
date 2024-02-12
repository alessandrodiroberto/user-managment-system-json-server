import { UserService } from '../../services/user.services';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Component({
  selector: 'tr[app-user-details]',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  userService = inject(UserService);

  public user$: Observable<User> = new Observable<User>();

  ngOnInit(): void {
    this.route.paramMap.subscribe((p) => {
      const segment = p.get('id'); //null se ha id va nella rotta create

      if (segment) {
        const id = Number(segment);
        this.user$ = this.userService.getUser(id);
      } else {
        this.user$ = this.userService.defaultUser();
      }
    });
  }
}
