import { ListUsersHandler } from './list-users.handler';
import { ListUsersEventsHandler } from './list-users-events.handler';

import { RetrieveUserHandler } from './retrieve-user.handler';

export const QueryHandlers = [
  ListUsersHandler,
  RetrieveUserHandler,
  ListUsersEventsHandler,
];
