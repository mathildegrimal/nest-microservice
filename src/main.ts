import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  NatsOptions,
  Transport,
} from '@nestjs/microservices';
import { AppModule } from './app.module';

import { MESSAGE_BROKER_HOST, MESSAGE_BROKER_PORT } from './config';

import { connect as connectToEventStore } from './event-store';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [`nats://${MESSAGE_BROKER_HOST}:${MESSAGE_BROKER_PORT}`],
      },
    },
  );

  await connectToEventStore();
  await app.listen();
  Logger.log('Microservice is listening !');
}
bootstrap();
