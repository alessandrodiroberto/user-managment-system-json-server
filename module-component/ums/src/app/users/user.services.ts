import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  fiscalCode: string;
  phoneNumber: string;
  province: string;
}

const names = [
  'Mario',
  'Luigi',
  'Peach',
  'Daisy',
  'Yoshi',
  'Toad',
  'Bowser',
  'Wario',
  'Waluigi',
  'Donkey Kong',
];
const lastNames = [
  'Rossi',
  'Bianchi',
  'Verdi',
  'Neri',
  'Gialli',
  'Blu',
  'Viola',
  'Arancioni',
  'Rosa',
  'Marroni',
];
const emails = [
  'mario@example.com',
  'luigi@example.com',
  'peach@example.com',
  'daisy@example.com',
  'yoshi@example.com',
  'toad@example.com',
  'bowser@example.com',
  'wario@example.com',
  'waluigi@example.com',
  'donkeykong@example.com',
];
const fiscalCodes = [
  'RSSMRA80A01H501U',
  'BNCLGU80A01H501U',
  'VRDPCH80A01H501U',
  'NRIDSY80A01H501U',
  'GLLYSH80A01H501U',
  'BLUTD80A01H501U',
  'VLRBSR80A01H501U',
  'RNCWR80A01H501U',
  'RSWLW80A01H501U',
  'MRNDK80A01H501U',
];
const phoneNumbers = [
  '+391234567890',
  '+391234567891',
  '+391234567892',
  '+391234567893',
  '+391234567894',
  '+391234567895',
  '+391234567896',
  '+391234567897',
  '+391234567898',
  '+391234567899',
];
const provinces = [
  'Roma',
  'Milano',
  'Napoli',
  'Torino',
  'Palermo',
  'Genova',
  'Bologna',
  'Firenze',
  'Bari',
  'Catania',
];

const getRandomElement = (array: any[]) =>
  array[Math.floor(Math.random() * array.length)];

@Injectable({
  providedIn: 'root', //In questo modo verrà creata una istanza per tutti i componenti
})
export class UserService {
  userUpdated = new Subject<User>(); //Oggetto che cambia valore observable
  userDeleted = new Subject<User>();
  userAdded = new Subject<User>();
  //userDeleted = new BehaviorSubject<User | null>(null); //Con valore di default

  users: User[] = [];

  constructor() {
    let index = 1;

    this.users = Array(10)
      .fill(0)
      .map(() => ({
        id: index++,
        name: getRandomElement(names),
        lastName: getRandomElement(lastNames),
        email: getRandomElement(emails),
        fiscalCode: getRandomElement(fiscalCodes),
        phoneNumber: getRandomElement(phoneNumbers),
        province: getRandomElement(provinces),
      }));
  }

  defaultUser(): User {
    return {
      id: 0,
      name: '',
      lastName: '',
      email: '',
      fiscalCode: '',
      phoneNumber: '',
      province: '',
    };
  }

  userExist(id: number): number {
    return this.users.findIndex((u) => u.id === id);
  }

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: number): User | null {
    const idx = this.userExist(id);
    return idx !== -1 ? { ...this.users[idx] } : null;
  }

  deleteUser(user: User) {
    const idx = this.userExist(user.id);
    this.users.splice(idx, 1);
  }

  updateUser(user: User): boolean {
    const idx = this.userExist(user.id);
    const v = idx !== -1;

    if (v) this.users[idx] = { ...user };

    return v;
  }

  createUser(user: User): boolean {
    const isValid =
      this.findUserByEmail(user.email) !== -1 &&
      this.findUserByFiscalCode(user.fiscalCode) !== -1;

    if (!isValid) {
      const len: number = this.users.length;

      user.id = len + 1;
      this.users.push(user);
    } else {
      alert('user already exist!');
    }

    return isValid;
  }

  findUserByEmail(email: string): number {
    return this.users.findIndex((u) => u.email === email);
  }

  findUserByFiscalCode(fiscalCode: string): number {
    return this.users.findIndex((u) => u.fiscalCode === fiscalCode);
  }
}
