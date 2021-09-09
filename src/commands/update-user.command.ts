export class UpdateUserCommand {
  public constructor(
    readonly id: number,
    readonly firstname: string,
    readonly lastname: string,
  ) {}
}
