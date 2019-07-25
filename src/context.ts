import { ContextFunction } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { ApolloStores } from './stores';

export interface IContext {
  authStore: ReturnType<ApolloStores['getAuthStore']>;
  dataStore: ReturnType<ApolloStores['getDataStore']>;
}

export function getApolloContext(): ContextFunction<ExpressContext> {
  // Runs on server boot
  const apolloStoreProvider = new ApolloStores();

  return async function (event): Promise<IContext> {
    // Runs on every request
    const authStore = await apolloStoreProvider.getAuthStore(event);
    const dataStore = await apolloStoreProvider.getDataStore(event);
    return {
      authStore,
      dataStore,
    };
  };
}
