import { RequestHandler } from "express";
export declare type PathParams = string | RegExp | (string | RegExp)[];
export interface IReloadRoute {
    method: string;
    path: PathParams;
    handlers: RequestHandler[];
}
export declare class ReloadRoute implements IReloadRoute {
    readonly method: string;
    readonly path: PathParams;
    readonly handlers: RequestHandler[];
    constructor(method: string, path: PathParams, ...handlers: RequestHandler[]);
}
export declare class ReloadRouter {
    private router;
    constructor();
    handler(): RequestHandler;
    routes(routes: IReloadRoute[]): void;
}
