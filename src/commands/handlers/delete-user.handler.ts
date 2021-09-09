import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppService } from '../../app.service';

import { DeleteUserCommand } from '../delete-user.command';

import { RpcException } from '@nestjs/microservices';
//import { StatusCodes } from 'http-status-codes';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly service: AppService) {}

  async execute(command: DeleteUserCommand): Promise<any> {
    let result: string;

    try {
      //console.log(command);
      result = await this.service.deleteUser(command);
    } catch (e) {
      throw new RpcException(e);
    }

    return result;
  }
}
