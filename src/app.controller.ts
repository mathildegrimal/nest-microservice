import { Controller, Logger, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand, CreateUserDTO } from './commands';
import { ListUsersQuery, RetrieveUserDTO, RetrieveUserQuery } from './queries';
@Controller()
export class AppController {
  private logger = new Logger('AppController');

  constructor(
    private appService: AppService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern('add')
  async accumulate(data: number[]) {
    this.logger.log('Adding ' + data.toString());
    return this.appService.accumulate(data);
  }

  @MessagePattern('hello')
  async accumulate2(name: string): Promise<string> {
    this.logger.log('Saying Hello to ' + name.toString());
    return this.appService.sayHello(name);
  }

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
}
