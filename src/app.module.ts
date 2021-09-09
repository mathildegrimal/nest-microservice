import { Module } from '@nestjs/common';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';
import { EventHandlers } from './events/handlers';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from './config';
import { User } from './entity/user.entity';

import { User as User2 } from 'domain/entities';

import { UserCreatedSagas } from './sagas/user-created.saga';
import { Subscriber } from './subscriber';
import { EventStoreDBClient } from '@eventstore/db-client';
import { Publisher } from './publisher';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      logging: false,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    UserCreatedSagas,
    {
      provide: Publisher,
      inject: [],
      async useFactory() {
        return new Publisher();
      },
    },
    {
      provide: Subscriber,
      inject: [EventBus],
      async useFactory(bus: EventBus) {
        const result = new Subscriber(bus);

        await result.initialize();

        return result;
      },
    },
  ],
})
export class AppModule {}
