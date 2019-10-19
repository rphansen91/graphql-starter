import { QueryResolvers, MutationResolvers } from '../../graphql.generated';
import { IContext } from '../../context';

export const rootQueryResolvers: QueryResolvers<IContext> = {
  empty: () => '',
};

export const rootMutationResolvers: MutationResolvers<IContext> = {
  empty: () => '',
};

export default {
  Query: rootQueryResolvers,
  Mutation: rootMutationResolvers,
};
