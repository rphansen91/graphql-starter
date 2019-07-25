import { GraphQLResolveInfo } from 'graphql';
import { IContext } from '../context';

export const authentication = async (
  r: any,
  p: any,
  a: any,
  c: IContext,
  i: GraphQLResolveInfo,
) => {
  return r(p, a, c, i);
};
