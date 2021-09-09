import { Injectable } from '@nestjs/common';

import {
  EventStoreDBClient,
  Credentials,
  StreamSubscription,
  EventType,
} from '@eventstore/db-client';

import { client as eventStore } from './event-store';

import * as Events from './events';

import { STREAM_NAME } from './config';
import { Constructor, EventBus } from '@nestjs/cqrs';

@Injectable()
export class Subscriber {
  public constructor(readonly bus: EventBus) {
    this.subscription = null;
  }

  async initialize(): Promise<void> {
    const typesAssociation = new Map<
      string,
      Constructor<InstanceType<typeof Events[keyof typeof Events]>>
    >();

    for (const event of Object.values(Events)) {
      const type = event.name;

      typesAssociation.set(type, event);
    }

    this.subscription = eventStore
      .subscribeToStream(STREAM_NAME)
      .on('data', (resolvedEvent) => {
        const event = resolvedEvent.event;

        if (event) {
          const clazz = typesAssociation.get(event.type);

          if (clazz) {
            this.bus.publish(Object.assign(new clazz(), event.data));
          }
        }
      });
  }

  async close(): Promise<void> {
    if (this.subscription) {
      await this.subscription.unsubscribe();
    }
  }

  private subscription: StreamSubscription<EventType> | null;
}
