import { QueryResolvers } from '../../graphql.generated';
import { IContext } from '../../context';

export const authQueryResolvers: QueryResolvers<IContext> = {
  isLoggedIn: (p, a, {}) => false,
};

export default {
  Query: authQueryResolvers,
};
