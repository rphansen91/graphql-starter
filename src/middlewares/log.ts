import { ResponsePath, GraphQLResolveInfo } from 'graphql';
import { IContext } from '../context';
import stopwatch from '../utils/stopwatch';

const fullInfoPathName = (
  { prev, key }: ResponsePath,
  name: string = '',
): string => {
  const newName = [key, name].filter(v => v).join('.');
  if (!prev) return newName;
  return fullInfoPathName(prev, newName);
};

export const logger = async (
  r: any,
  p: any,
  a: any,
  c: IContext,
  i: GraphQLResolveInfo,
) => {
  const name = `${i.operation.operation} ${fullInfoPathName(i.path)}`;
  const argsStr = JSON.stringify(a);
  const timer = stopwatch();
  try {
    const result = await r(p, a, c, i);
    console.log(`${name}(${argsStr})`, `Timer ${timer()}ms`);
    return result;
  } catch (e) {
    console.log(`${name}(${argsStr})`, 'error', e.message, e.stack);
    console.log(`${name}(${argsStr})`, `Timer ${timer()}ms`);
  }
};
