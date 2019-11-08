import { IDropOptions, ILogger } from './interfaces';

export function makeTrackEvent({
  d,
  apiUri,
  logger,
}: {
  w: typeof window;
  d: typeof document;
  apiUri: string;
  logger: ILogger;
}) {
  function appendChild(element: Element) {
    if (d.body) {
      d.body.appendChild(element);
    } else {
      d.addEventListener('readystatechange', () => appendChild(element));
    }
  }

  function appendImgPixel(src: string) {
    const img = d.createElement('img');
    img.style.position = 'absolute';
    img.style.top = '-1000px';
    img.style.left = '-1000px';
    img.style.opacity = '0';
    img.src = src;
    appendChild(img);
  }

  function addLinkClickPixel(opts: IDropOptions) {
    if (opts.drop_id) {
      appendImgPixel(`${apiUri}/drop/click/${opts.drop_id}`);
    }
  }

  function addConversionPixel(opts: IDropOptions) {
    if (opts.drop_id) {
      appendImgPixel(`${apiUri}/drop/convert/${opts.drop_id}`);
    }
  }

  return function (opts?: IDropOptions) {
    if (!opts) return;
    logger('Track event', opts);
    switch (opts && opts.event) {
      case 'click':
        return addLinkClickPixel(opts);
      case 'convert':
        return addConversionPixel(opts);
    }
  };
}
