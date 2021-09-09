import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ListUsersQuery } from '../list-users.query';
import { Connection } from 'typeorm';
import { User } from 'src/entity/user.entity';
import {
  AppendResult,
  FORWARDS,
  jsonEvent,
  START,
} from '@eventstore/db-client';

import { client as eventStore } from '../../event-store';
import { STREAM_NAME } from '../../config';

//import { RpcException } from '@nestjs/microservices';
//import { StatusCodes } from 'http-status-codes';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements IQueryHandler<ListUsersQuery> {
  constructor(private readonly connection: Connection) {}

  async execute(): Promise<User[]> {
    const userRepository = this.connection.getRepository(User);
    const users = await userRepository.find();

    return users;
  }
}
