import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppService } from '../../app.service';

import { CreateUserCommand } from '../create-user.command';

import { RpcException } from '@nestjs/microservices';
//import { StatusCodes } from 'http-status-codes';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly service: AppService) {}

  async execute(command: CreateUserCommand): Promise<any> {
    let result: string;

    try {
      result = await this.service.createUser(command);
    } catch (e) {
      throw new RpcException(e);
    }

    return result;
  }
}
