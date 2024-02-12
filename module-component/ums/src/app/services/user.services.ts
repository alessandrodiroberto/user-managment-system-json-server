import { Injectable, inject } from '@angular/core';
import { Observable, Subject, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apirUrl = environment.APIURL;

  http = inject(HttpClient);

  defaultUser(): Observable<User> {
    return of(new User());
  }

  userExist(id: number): boolean {
    return this.http.get<User>(this.apirUrl + '/' + id) === null;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apirUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.apirUrl + '/' + id);
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(this.apirUrl + '/' + user.id);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.apirUrl + '/' + user.id, user);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apirUrl, user);
  }

  findUserByEmail(email: string): Observable<number> {
    return this.getUsers().pipe(
      map((u) => u.findIndex((u) => u.email === email))
    );
  }

  findUserByFiscalCode(fiscalCode: string): Observable<number> {
    return this.getUsers().pipe(
      map((u) => u.findIndex((u) => u.fiscalCode === fiscalCode))
    );
  }
}
