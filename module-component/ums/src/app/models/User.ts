import { IUser } from '../interfaces/IUser';

export class User implements IUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
  fiscalCode: string;
  phoneNumber: string;
  province: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.lastName = '';
    this.email = '';
    this.fiscalCode = '';
    this.phoneNumber = '';
    this.province = '';
  }
}
