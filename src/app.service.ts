import { AppendResult, jsonEvent } from '@eventstore/db-client';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDTO, UpdateUserDTO } from './commands';
import { User } from './entity/user.entity';
import { STREAM_NAME } from './config';
import { client as eventStore } from './event-store';

import * as Events from './events';
import { EventPublisher } from '@nestjs/cqrs';
import { Publisher } from './publisher';
import { DeleteUserDTO } from './commands/dto/delete-user.dto';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    readonly publisher: Publisher,
  ) {}

  public async createUser(user: CreateUserDTO): Promise<string> {
    const userCreated = new User();
    userCreated.firstname = user.firstname;
    userCreated.lastname = user.lastname;
    await this.userRepository.save(userCreated);

    await this.publisher.publish(new Events.UserCreated(userCreated));
    return `Utilisateur créé avec le nom ${user.lastname} et le prenom ${user.firstname}`;
  }

  public async updateUser(user: UpdateUserDTO): Promise<string> {
    await this.userRepository.update(user.id, {
      firstname: user.firstname,
      lastname: user.lastname,
    });
    //await this.publisher.publish(new Events.UserCreated(userCreated));
    return `Utilisateur avec l'id ${user.id} a été modifié`;
  }

  public async deleteUser(user: DeleteUserDTO): Promise<string> {
    await this.userRepository.delete(user);
    //await this.publisher.publish(new Events.UserCreated(userCreated));
    return `Utilisateur avec l'id ${user.id} a été supprimé`;
  }
}
