// tslint:disable:import-name
import { mergeTypes } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'apollo-server';
import defaultsDeep from 'lodash/defaultsDeep';
import rootSchema from './root/schema';
import rootResolvers from './root/resolvers';
import authSchema from './auth/schema';
import authResolvers from './auth/resolvers';

const typeDefs = mergeTypes([rootSchema, authSchema]);

const resolvers = defaultsDeep({}, rootResolvers, authResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
