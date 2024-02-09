import { UserService } from '../../services/user.services';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../services/user.services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  userService = inject(UserService);

  public user$: Observable<User> = new Observable<User>();

  ngOnInit(): void {
    this.route.paramMap.subscribe((p) => {
      const segment = p.get('id'); //null se ha va nella rotta create

      if (segment) {
        const id = Number(segment);
        this.user$ = this.userService.getUser(id);
      } else {
        this.user$ = this.userService.defaultUser();
      }
    });
  }
}
