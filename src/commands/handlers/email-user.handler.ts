import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { EmailUserCommand } from '../email-user.command';
//import { StatusCodes } from 'http-status-codes';

@CommandHandler(EmailUserCommand)
export class EmailUserHandler implements ICommandHandler<EmailUserCommand> {
  constructor() {}

  async execute(command: EmailUserCommand) {
    console.log(
      `User ${command.firstname} ${
        command.lastname
      } was emailed ${new Date().toLocaleDateString()}`,
    );
  }
}
