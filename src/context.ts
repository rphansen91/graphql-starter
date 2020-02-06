import {
  makeMongoStore,
  connect,
  mongoUri,
  mongoDbName,
  Db,
} from './stores/mongo';
import stopwatch from './utils/stopwatch';

export type IContext = ReturnType<typeof getContext>;

function getContext(db: Db) {
  return {
    ...makeMongoStore(db),
  };
}

export async function getApolloContext(): Promise<IContext> {
  // Runs on every request
  const track = stopwatch();
  const connection = await connect(mongoUri);
  const db = connection.db(mongoDbName);
  console.log(`Connected to mongo ${track()}`);
  return getContext(db);
}
