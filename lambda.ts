import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyCallback,
  APIGatewayProxyResult,
} from 'aws-lambda';
import get from 'lodash/get';
import { getApolloContext, IContext } from './src/context';
import stopwatch from './src/utils/stopwatch';
import { ObjectID } from 'mongodb';

interface RequestParams {
  id: string;
}

export const eventScript = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: APIGatewayProxyCallback,
) => {
  callback(null, sendEventScript());
};

export const eventScriptMap = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: APIGatewayProxyCallback,
) => {
  callback(null, sendEventScriptMap());
};

export const advancedDropOptIn = handleRequest(
  async ({ id }, { coinDropsAdvancedOptIn }) => {
    await coinDropsAdvancedOptIn.findOneAndUpdate(
      {
        advancedId: new ObjectID(id),
      },
      {
        $set: {},
      },
      { upsert: true, returnOriginal: false },
    );
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  },
  () => ({ statusCode: 200, body: JSON.stringify({ success: false }) }),
);

export const dropRedirect = handleRequest(
  async ({ id }, { withIdFilter, coinDrops }) => {
    console.log('Click redirect', { id });
    const trackTime = stopwatch();
    const { value } = await coinDrops.findOneAndUpdate(
      withIdFilter(id),
      {
        $set: {
          linkClicked: true,
          linkClickedTime: new Date(),
        },
      },
      { w: 0, maxTimeMS: 1000 },
    );
    console.log('Drop found', trackTime());
    console.log('Drop redirect', value);
    const location = withRedirectLink(id, value);
    const { host, hostname } = getLocation(location);
    console.log({ host, hostname });
    const cookie = withRedirectCookie(id);
    return sendRedirect(location, cookie);
  },
  () => sendRedirect(),
);

export const dropClick = handleRequest(
  async ({ id }, { withIdFilter, coinDrops }) => {
    await coinDrops.updateOne(withIdFilter(id), {
      $set: {
        linkClicked: true,
        linkClickedTime: new Date(),
      },
    });
    return sendImgPixel();
  },
  () => sendImgPixel(),
);

export const dropConvert = handleRequest(
  async ({ id }, { withIdFilter, coinDrops }) => {
    await coinDrops.updateOne(withIdFilter(id), {
      $set: {
        converted: true,
        conversionTime: new Date(),
      },
    });
    return sendImgPixel();
  },
  () => sendImgPixel(),
);

function handleRequest(
  fn: (params: RequestParams, ctx: IContext) => Promise<APIGatewayProxyResult>,
  onError: (err: Error) => APIGatewayProxyResult,
) {
  return async function (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: APIGatewayProxyCallback,
  ) {
    try {
      console.log('Request Headers', event.headers);
      context.callbackWaitsForEmptyEventLoop = false;
      const params = withRequestParams(event);
      const ctx = await getApolloContext();
      const response = await fn(params, ctx);
      callback(null, response);
    } catch (err) {
      console.log('Tracker error', err);
      callback(null, onError(err));
    }
  };
}

function withRequestParams(event: APIGatewayProxyEvent): { id: string } {
  const id =
    (get(event, 'queryStringParameters.id') as string) ||
    (get(event, 'pathParameters.id') as string);
  return {
    id,
  };
}

function sendImgPixel(): APIGatewayProxyResult {
  const body = new Buffer(
    'R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==',
    'base64',
  ).toString('base64');
  return {
    body,
    statusCode: 200,
    headers: {
      'Content-Type': 'image/png',
      'Content-Length': body.length,
    },
    isBase64Encoded: true,
  };
}

function sendRedirect(
  location?: string,
  cookie?: string,
): APIGatewayProxyResult {
  const headers: any = {
    'Cache-Control': 'public, max-age=0',
  };
  headers['Location'] = location || 'https://my.coinapp.co';
  if (cookie) headers['Set-Cookie'] = cookie;
  return {
    headers,
    statusCode: 301,
    body: '',
  };
}

function sendEventScript(): APIGatewayProxyResult {
  return {
    statusCode: 200,
    headers: {
      'Cache-Control': 'public, max-age=7200',
      'Content-Type': 'application/javascript',
    },
    body: require('./sdk/events').default,
  };
}

function sendEventScriptMap(): APIGatewayProxyResult {
  return {
    statusCode: 200,
    headers: {
      'Cache-Control': 'public, max-age=7200',
      'Content-Type': 'application/javascript',
    },
    body: require('./sdk/events.js.map').default,
  };
}

function withRedirectLink(id: string, drop: any) {
  if (!drop || !drop.link) return 'https://my.coinapp.co';
  let link = drop.link;
  link += link.includes('?') ? '&' : '?';
  link += `drop_id=${id}&utm_source=coin`;
  return link;
}

function withRedirectCookie(id: string) {
  const expires = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 365,
  ).toUTCString();
  return toCookieString({
    drop_id: id,
    Expires: expires,
    Domain: 'coinapp.co',
    Path: '/',
    SameSite: 'None',
  });
}

function toCookieString(cookies: any) {
  return Object.keys(cookies || {})
    .map(key => `${key}=${cookies[key]}`)
    .join('; ');
}

function getLocation(href: string) {
  const match = href.match(
    /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/,
  );
  return match
    ? {
      href,
      protocol: match[1],
      host: match[2],
      hostname: match[3],
      port: match[4],
      pathname: match[5],
      search: match[6],
      hash: match[7],
    }
    : {};
}
