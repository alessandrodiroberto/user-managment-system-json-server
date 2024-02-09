import { UserService } from './../user.services';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.services';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  userService = inject(UserService);

  user: User | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe((p) => {
      const segment = p.get('id'); //null se ha va nella rotta create

      if (segment) {
        const id = Number(segment);
        this.user = this.userService.getUser(id);
      } else {
        this.user = this.userService.defaultUser();
      }
    });
  }
}
