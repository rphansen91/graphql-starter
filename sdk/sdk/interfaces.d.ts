export declare type ILogger = (...args: any[]) => void;
export declare type IParser = (str: string) => any;
export interface IDropOptions {
    event?: string;
    drop_id?: string;
    __tracked?: boolean;
}
