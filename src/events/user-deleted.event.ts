//import { IUser } from '../interfaces';

export class UserDeleted {
  public constructor(
    public readonly id: number,
    public readonly status: boolean,
  ) {}
}
