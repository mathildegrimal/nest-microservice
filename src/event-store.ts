import { EventStoreDBClient, FORWARDS, START } from '@eventstore/db-client';
import { EVENT_STORE_HOST, EVENT_STORE_PORT } from './config';

const client = EventStoreDBClient.connectionString(
  `esdb://${EVENT_STORE_HOST}:${EVENT_STORE_PORT}?tls=false`,
);

const connect = async () => {
  await client.readAll({
    direction: FORWARDS,
    fromPosition: START,
    maxCount: 1,
  });
};

export { client, connect };
