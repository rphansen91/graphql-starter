import { MongoClient } from 'mongodb';

const clients: { [uri: string]: MongoClient } = {};
const promise: { [uri: string]: Promise<MongoClient> } = {};

export default async (uri: string) => {
  if (clients[uri] && clients[uri].isConnected()) return clients[uri];
  if (promise[uri]) return promise[uri];
  promise[uri] = MongoClient.connect(uri, {
    useUnifiedTopology: true,
  });
  clients[uri] = await promise[uri];
  return clients[uri];
};
