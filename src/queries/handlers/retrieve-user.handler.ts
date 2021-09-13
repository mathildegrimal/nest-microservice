import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Connection } from 'typeorm';
import { User } from '../../entity/user.entity';
import { RetrieveUserQuery } from '../retrieve-user.query';

import { RpcException } from '@nestjs/microservices';

@QueryHandler(RetrieveUserQuery)
export class RetrieveUserHandler implements IQueryHandler<RetrieveUserQuery> {
  constructor(private readonly connection: Connection) {}

  async execute(
    query: RetrieveUserQuery,
  ): Promise<Record<string, string | any> | null> {
    try {
      let result: Record<string, string | any> | null = null;
      const userRepository = this.connection.getRepository(User);
      const user = await userRepository.findOne({
        where: { email: query.email },
      });

      if (user) {
        result = { user };
      }
      return result;
    } catch (e) {
      throw new RpcException(e);
    }
  }
}
