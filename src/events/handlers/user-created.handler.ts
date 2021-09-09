import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { UserCreated } from '../user-created.event';

@EventsHandler(UserCreated)
export class UserCreatedHandler implements IEventHandler<UserCreated> {
  handle(event: UserCreated) {
    console.log(clc.greenBright('User created event...'));
  }
}
