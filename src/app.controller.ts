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
import { ListUsersQuery, RetrieveUserDTO, RetrieveUserQuery } from './queries';
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
    this.logger.log('Creating User');
    const { firstname, lastname } = user;
    return this.commandBus.execute(new CreateUserCommand(firstname, lastname));
  }

  @MessagePattern('getUsers')
  async getUsers(): Promise<string> {
    this.logger.log('getting all users');
    return this.queryBus.execute(new ListUsersQuery());
  }

  @MessagePattern('retrieveUser')
  async retrieveUser(retrieveUserDTO: RetrieveUserDTO) {
    const lastname = retrieveUserDTO.lastname;
    this.logger.log('Retrieving one user ' + lastname);
    return this.queryBus.execute(
      new RetrieveUserQuery(retrieveUserDTO.lastname),
    );
  }

  @MessagePattern('updateUser')
  async updateUser(param: any) {
    console.log('log du controller', param);

    this.logger.log('Updating user with id ' + param.id);

    return this.commandBus.execute(
      new UpdateUserCommand(param.id, param.firstname, param.lastname),
    );
  }

  @MessagePattern('deleteUser')
  async deleteUser(param: any) {
    this.logger.log('Deleting user with id ' + param.id);
    //return 'user deleted';
    return this.commandBus.execute(new DeleteUserCommand(param.id));
  }
}
