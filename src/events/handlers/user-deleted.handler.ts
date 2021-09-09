import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { UserDeleted } from '../user-deleted.event';

@EventsHandler(UserDeleted)
export class UserDeletedHandler implements IEventHandler<UserDeleted> {
  handle(event: UserDeleted) {
    if (event.status) {
      console.log(clc.bgRedBright('User deleted'));
    } else {
      console.log(clc.bgXterm(162)('User not deleted'));
    }
  }
}
