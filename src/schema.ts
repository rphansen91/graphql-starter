import { mergeTypes } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'apollo-server';
import defaultsDeep from 'lodash/defaultsDeep';
import rootSchema from './gql/root.schema';
import rootResolvers from './gql/root.resolvers';
import authSchema from './gql/auth.schema';
import authResolvers from './gql/auth.resolvers';

const typeDefs = mergeTypes([rootSchema, authSchema]);

const resolvers = defaultsDeep({}, rootResolvers, authResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
