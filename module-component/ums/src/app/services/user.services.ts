import { Injectable, inject, numberAttribute } from '@angular/core';
import { Observable, Subject, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { User } from '../models/User';
import { IUser } from '../interfaces/IUser';

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

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apirUrl);
  }

  getUser(id: string): Observable<IUser> {
    return this.http.get<IUser>(this.apirUrl + '/' + id);
  }

  deleteUser(id : number): Observable<IUser> {
    return this.http.delete<IUser>(this.apirUrl + '/' + id);
  }

  updateUser(user: User): Observable<IUser> {
    return this.http.put<IUser>(this.apirUrl + '/' + user.id, user);
  }

  createUser(user: User): Observable<IUser> {
    return this.http.post<IUser>(this.apirUrl, user);
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
