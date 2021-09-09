export class EmailUserCommand {
  public firstname: string;
  public lastname: string;

  public constructor(firstname: string, lastname: string) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
