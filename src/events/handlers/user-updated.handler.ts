import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { UserUpdated } from '../user-updated.event';

@EventsHandler(UserUpdated)
export class UserUpdatedHandler implements IEventHandler<UserUpdated> {
  handle(event: UserUpdated) {
    console.log(clc.xterm(238).bgXterm(227)('User updated'));
  }
}
