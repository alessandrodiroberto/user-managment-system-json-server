import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { UserService } from './services/user.services';
import { UserDetailsComponent } from './users/user-details/user-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'User Managment System';
  userService = inject(UserService);
}
