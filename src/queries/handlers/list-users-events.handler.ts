import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ListUsersEventsQuery } from '../list-users-events.query';
import { Connection } from 'typeorm';
import { FORWARDS, START } from '@eventstore/db-client';

import { client as eventStore } from '../../event-store';

//import { RpcException } from '@nestjs/microservices';
//import { StatusCodes } from 'http-status-codes';

@QueryHandler(ListUsersEventsQuery)
export class ListUsersEventsHandler
  implements IQueryHandler<ListUsersEventsQuery>
{
  constructor(private readonly connection: Connection) {}

  async execute(): Promise<any> {
    const usersEvents: Array<object> = [];

    const events = eventStore.readAll({
      direction: FORWARDS,
      fromPosition: START,
      maxCount: 1000,
    });

    //console.log(events);

    for await (const { event } of events) {
      if (event.type.charAt(0) != '$') {
        const datas: any = event.data;
        //console.log(datas);
        usersEvents.push({
          type: event.type,
          datas,
        });
      }
    }

    //console.log(UsersEventsEvents);
    return usersEvents;
  }
}
