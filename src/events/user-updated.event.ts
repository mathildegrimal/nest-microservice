import { IUser } from '../interfaces';

export class UserUpdated {
  public constructor(public readonly user: IUser) {}
}
