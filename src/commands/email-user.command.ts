export class EmailUserCommand {
  public firstname: string;
  public lastname: string;
  public email: string;

  public constructor(firstname: string, lastname: string, email: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  }
}
