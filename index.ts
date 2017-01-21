import * as express from "express";
import {RequestHandler, Router, IRouterMatcher, Request} from "express";

export type PathParams = string | RegExp | (string | RegExp)[];

export interface IReloadRoute {
    method: string;
    path: PathParams;
    handlers: RequestHandler[];
}

export class ReloadRoute implements IReloadRoute {
    readonly handlers: RequestHandler[];

    constructor(
        readonly method: string,
        readonly path: PathParams,
        ...handlers: RequestHandler[]) {

        this.handlers = handlers;
    }
}

export class ReloadRouter {

    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    handler(): RequestHandler {
        return (req, res, next) => {
            this.router(req, res, next);
        };
    }

    routes(...routes: IReloadRoute[]) {
        let newRouter = express.Router();

        for (let r of routes) {
            switch (r.method) {
                case "get":
                    newRouter.get(r.path, r.handlers);
                    break;
                case "delete":
                    newRouter.delete(r.path, r.handlers);
                    break;
                case "post":
                    newRouter.post(r.path, r.handlers);
                    break;
                case "options":
                    newRouter.options(r.path, r.handlers);
                    break;
                case "trace":
                    newRouter.trace(r.path, r.handlers);
                    break;
            }
        }

        this.router = newRouter;
    }
}
