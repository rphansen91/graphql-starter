import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

export class ApolloStores {
  constructor() {}

  getAuthStore({ req }: ExpressContext) {
    return {
      isLoggedIn: () => false,
    };
  }

  getDataStore({ req }: ExpressContext) {
    return {};
  }
}
