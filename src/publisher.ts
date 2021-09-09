import { Injectable } from '@nestjs/common';

import { AppendResult, jsonEvent } from '@eventstore/db-client';

import * as Events from './events';
import { client as eventStore } from './event-store';

import { STREAM_NAME } from './config';

@Injectable()
export class Publisher {
  public constructor() {}

  async publish(
    event: InstanceType<typeof Events[keyof typeof Events]>,
  ): Promise<AppendResult> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (function cleanCopy(data: any) {
      const result = {};

      for (const key in data) {
        if (key === 'pid') {
          continue;
        }

        const current = data[key];

        if (typeof current === 'object') {
          result[key] = cleanCopy(current);
        } else {
          result[key] = current;
        }
      }

      return result;
    })(event);

    return eventStore.appendToStream(
      STREAM_NAME,
      jsonEvent({
        type: event.constructor.name,
        data,
      }),
    );
  }
}
