import { CreateUserHandler } from './create-user.handler';
import { EmailUserHandler } from './email-user.handler';
import { DeleteUserHandler } from './delete-user.handler';
import { UpdateUserHandler } from './update-user.handler';

export const CommandHandlers = [
  CreateUserHandler,
  EmailUserHandler,
  DeleteUserHandler,
  UpdateUserHandler,
];
