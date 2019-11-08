import { IDropOptions, IParser, ILogger } from './interfaces';
export declare function makeWithOptions({ d, w, parser, logger, }: {
    d: typeof document;
    w: typeof window;
    parser: IParser;
    logger: ILogger;
}): (opts?: IDropOptions | undefined) => any;
