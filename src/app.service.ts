import { AppendResult, jsonEvent } from '@eventstore/db-client';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './commands';
import { User } from './entity/user.entity';
import { STREAM_NAME } from './config';
import { client as eventStore } from './event-store';

import * as Events from './events';
import { EventPublisher } from '@nestjs/cqrs';
import { Publisher } from './publisher';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    readonly publisher: Publisher,
  ) {}
  public accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => Number(a) + Number(b));
  }

  public sayHello(name: string): string {
    return 'Hello ' + name + ', welcome to this MicroService';
  }

  public async createUser(user: CreateUserDTO): Promise<string> {
    const userCreated = new User();
    userCreated.firstname = user.firstname;
    userCreated.lastname = user.lastname;
    await this.userRepository.save(userCreated);

    await this.publisher.publish(new Events.UserCreated(userCreated));
    return `Utilisateur créé avec le nom ${user.lastname} et le prenom ${user.firstname}`;
  }
}
