import { ApolloServer } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { getApolloContext } from './context';
import { authentication } from './middlewares/auth';
import { logger } from './middlewares/log';
import schema from './gql/schema';

const PORT = Number(process.env.PORT) || 8080;

main(PORT);

async function main(port: number) {
  try {
    const graphqlSchema = applyMiddleware(schema, logger, authentication);
    const server = new ApolloServer({
      context: getApolloContext,
      schema: graphqlSchema,
    });
    const { url } = await server.listen(port);
    console.log(`🚀 Listening at ${url}`);
  } catch (e) {
    console.log('❌ Boot error', e.message);
  }
}
