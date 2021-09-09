import { Controller, Logger, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateUserCommand,
  CreateUserDTO,
  DeleteUserCommand,
  UpdateUserCommand,
} from './commands';
import {
  ListUsersQuery,
  RetrieveUserDTO,
  RetrieveUserQuery,
  ListUsersEventsQuery,
} from './queries';
import * as clc from 'cli-color';

const msg = clc.xterm(202).bgXterm(236);

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  constructor(
    private appService: AppService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern('createUser')
  async createUser(user: CreateUserDTO): Promise<string> {
    console.log(msg('Creating User'));
    const { firstname, lastname } = user;
    return this.commandBus.execute(new CreateUserCommand(firstname, lastname));
  }

  @MessagePattern('getUsers')
  async getUsers(): Promise<string> {
    console.log(msg('Getting all users'));
    return this.queryBus.execute(new ListUsersQuery());
  }

  @MessagePattern('getUsersEvents')
  async getUsersEvent(): Promise<string> {
    console.log(msg('Getting all users events'));
    return this.queryBus.execute(new ListUsersEventsQuery());
  }

  @MessagePattern('retrieveUser')
  async retrieveUser(retrieveUserDTO: RetrieveUserDTO) {
    const lastname = retrieveUserDTO.lastname;
    console.log(msg('Retrieving one user ' + lastname));
    return this.queryBus.execute(
      new RetrieveUserQuery(retrieveUserDTO.lastname),
    );
  }

  @MessagePattern('updateUser')
  async updateUser(param: any) {
    console.log(msg('Updating user with id ' + param.id));
    return this.commandBus.execute(
      new UpdateUserCommand(param.id, param.firstname, param.lastname),
    );
  }

  @MessagePattern('deleteUser')
  async deleteUser(param: any) {
    console.log(msg('Deleting user with id ' + param.id));
    return this.commandBus.execute(new DeleteUserCommand(param.id));
  }
}
