import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDTO, UpdateUserDTO } from './commands';
import { User } from './entity/user.entity';

import * as Events from './events';
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
    userCreated.email = user.email;
    await this.userRepository.save(userCreated);
    await this.publisher.publish(new Events.UserCreated(userCreated));
    return `Utilisateur créé avec le nom ${user.lastname} et le prenom ${user.firstname}`;
  }

  public async updateUser(user: UpdateUserDTO): Promise<string> {
    const update: Partial<User> = {};

    if (user.firstname) {
      update.firstname = user.firstname;
    }

    if (user.lastname) {
      update.lastname = user.lastname;
    }

    if (user.email) {
      update.email = user.email;
    }

    if (Object.keys(update).length > 0) {
      const userUpdated = await this.userRepository.findOne(user.id);

      await this.userRepository.update(user.id, update);

      await this.publisher.publish(new Events.UserUpdated(userUpdated));
      return `Utilisateur avec l'id ${user.id} a été modifié`;
    } else {
      return `l'Utilisateur avec l'id ${user.id} n'a été modifié : rien a modifier`;
    }
  }

  public async deleteUser(user: DeleteUserDTO): Promise<string> {
    const userToDelete = await this.userRepository.findOne(user);

    if (userToDelete) {
      await this.userRepository.delete(user);
      await this.publisher.publish(new Events.UserDeleted(user.id, true));
      return `Utilisateur avec l'id ${user.id} a été supprimé`;
    } else {
      await this.publisher.publish(new Events.UserDeleted(user.id, false));
      return `Pas d'utilisateur avec l'id ${user.id}`;
    }
  }
}
