import { IDropOptions, ILogger } from './interfaces';
export declare function makeTrackEvent({ d, apiUri, logger, }: {
    w: typeof window;
    d: typeof document;
    apiUri: string;
    logger: ILogger;
}): (opts?: IDropOptions | undefined) => void;
