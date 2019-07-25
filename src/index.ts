import { ApolloServer } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { getApolloContext } from './context';
import { authentication } from './middlewares/auth';
import { permissions } from './middlewares/permissions';
import { logger } from './middlewares/log';
import schema from './schema';

const PORT = Number(process.env.PORT) || 8080;

main(PORT);

async function main(port: number) {
  try {
    const graphqlContext = getApolloContext();
    const graphqlSchema = applyMiddleware(
      schema,
      logger,
      authentication,
      permissions,
    );
    const server = new ApolloServer({
      context: graphqlContext,
      schema: graphqlSchema,
    });
    const { url } = await server.listen(port);
    console.log(`🚀 Listening at ${url}`);
  } catch (e) {
    console.log('❌ Boot error', e.message);
  }
}
