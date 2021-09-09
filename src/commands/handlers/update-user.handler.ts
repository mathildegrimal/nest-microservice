import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppService } from '../../app.service';

import { UpdateUserCommand } from '../update-user.command';

import { RpcException } from '@nestjs/microservices';
//import { StatusCodes } from 'http-status-codes';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly service: AppService) {}

  async execute(command: UpdateUserCommand): Promise<any> {
    let result: string;

    try {
      //console.log(command);
      result = await this.service.updateUser(command);
    } catch (e) {
      throw new RpcException(e);
    }

    return result;
  }
}
