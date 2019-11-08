import { IDropOptions, IParser, ILogger } from './interfaces';

export function makeWithOptions({
  d,
  w,
  parser,
  logger,
}: {
  d: typeof document;
  w: typeof window;
  parser: IParser;
  logger: ILogger;
}) {
  const fromCookie = parser(d.cookie); // From cookie
  const fromQuery = parser(w.location.search.replace(/^\?/, '')); // From query string
  logger({ fromCookie, fromQuery });
  return function (opts?: IDropOptions) {
    return { ...fromCookie, ...fromQuery, ...opts };
  };
}
