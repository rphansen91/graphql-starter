import {
  makeMongoStore,
  connect,
  mongoUri,
  mongoDbName,
  Db,
} from './stores/mongo';

export type IContext = ReturnType<typeof getContext>;

function getContext(db: Db) {
  return {
    ...makeMongoStore(db),
  };
}

export async function getApolloContext(): Promise<IContext> {
  // Runs on every request
  const connection = await connect(mongoUri);
  const db = connection.db(mongoDbName);
  return getContext(db);
}
