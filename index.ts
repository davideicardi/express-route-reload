import * as express from "express";
import {RequestHandler, Router as ExpressRouter, IRouterMatcher, Request} from "express";
import * as Handlebars from "handlebars";

type PathParams = string | RegExp | (string | RegExp)[];

export interface IRoute {
    method : string;
    path : PathParams;
    handlers : RequestHandler[];
}

export class Route implements IRoute {
    readonly handlers : RequestHandler[];

    constructor(
        readonly method : string,
        readonly path : PathParams,
        ...handlers : RequestHandler[]) {

        this.handlers = handlers;
    }
}

export interface IView {
    render(model : any, options : any) : Promise<string>;
}

export interface Controller {
    (req: Request): Promise<any>;
}

export class HandlebarsView implements IView {
    private compiledTemplate : HandlebarsTemplateDelegate;

    constructor(
        private template : string){
    }

    async render(model : any, options : any) : Promise<string> {
        if (!this.compiledTemplate) {
            this.compiledTemplate = Handlebars.compile(this.template);
        }

        return this.compiledTemplate(model, options);
    }
}

export class MVC {
    static handler(controller : Controller, view : IView, options? : any) : RequestHandler {
        return async (req, res) => {
            let model = await controller(req);
            let output = await view.render(model, options);

            res.send(output);
        };
    }
}


export class Router {

    private router : ExpressRouter;

    constructor() {
        this.router = express.Router();
    }

    handler() : RequestHandler {
        return (req, res, next) => {
            this.router(req, res, next);
        };
    }

    routes(...routes: IRoute[]) {
        let newRouter = express.Router();

        for (let r of routes){
            switch (r.method){
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
