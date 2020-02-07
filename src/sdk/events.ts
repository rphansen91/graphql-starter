import parse from '../utils/parse';
import { IDropOptions, ILogger } from './interfaces';
import { makeWithOptions } from './options';
import { makeTrackEvent } from './track';

interface ICoinTrackerDeps {
  w: any;
  withOptions: ReturnType<typeof makeWithOptions>;
  trackEvent: ReturnType<typeof makeTrackEvent>;
}

function makeCoinTracker({ w, withOptions, trackEvent }: ICoinTrackerDeps) {
  function push(options: IDropOptions) {
    if (options.__tracked) return;
    trackEvent(withOptions(options));
    options.__tracked = true;
    originalPush(options);
  }

  w.coinTracker = w.coinTracker || [];
  const originalPush = w.coinTracker.push.bind(w.coinTracker);
  w.coinTracker.push = push;
  w.coinTracker.forEach(push);
  if (w.coinTracker && !w.coinTracker.length) {
    w.coinTracker.push({ event: 'ping' });
  }
  return w.coinTracker;
}

const w = window;
const d = document;
const apiUri = 'https://t.coinapp.co';
const logger: ILogger = (...v) => console.log('COIN Tracker', ...v);
const withOptions = makeWithOptions({ w, d, logger, parser: parse });
const trackEvent = makeTrackEvent({ w, d, apiUri, logger });

export const coinTracker = makeCoinTracker({
  w,
  withOptions,
  trackEvent,
});

export const forEach = coinTracker.forEach.bind(coinTracker);
export const push = coinTracker.push.bind(coinTracker);
