import { Injectable } from '@nestjs/common';

import { UserCreated } from '../events';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { EmailUserCommand } from '../commands/email-user.command';
@Injectable()
export class UserCreatedSagas {
  @Saga()
  whenUserIsCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreated),
      map(
        (event) =>
          new EmailUserCommand(
            event.user.firstname,
            event.user.lastname,
            event.user.email,
          ),
      ),
    );
  };
}
