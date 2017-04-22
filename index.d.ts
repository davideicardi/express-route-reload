/// <reference types="express" />
import { RequestHandler } from "express";
export declare class ReloadRouter {
    private router;
    constructor();
    handler(): RequestHandler;
    reload(handlers: RequestHandler[]): void;
}
