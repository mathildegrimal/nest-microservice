import { IUser } from '../interfaces';

export class UserCreated {
  public constructor(public readonly user: IUser) {}
}
