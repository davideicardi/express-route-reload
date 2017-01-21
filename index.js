"use strict";
const express = require("express");
class ReloadRoute {
    constructor(method, path, ...handlers) {
        this.method = method;
        this.path = path;
        this.handlers = handlers;
    }
}
exports.ReloadRoute = ReloadRoute;
class ReloadRouter {
    constructor() {
        this.router = express.Router();
    }
    handler() {
        return (req, res, next) => {
            this.router(req, res, next);
        };
    }
    routes(...routes) {
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
exports.ReloadRouter = ReloadRouter;
//# sourceMappingURL=index.js.map