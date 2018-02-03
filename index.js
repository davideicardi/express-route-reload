"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class ReloadRouter {
    constructor() {
        this.router = express.Router();
    }
    handler() {
        return (req, res, next) => {
            this.router(req, res, next);
        };
    }
    reload(handlers) {
        const newRouter = express.Router();
        if (handlers.length) {
            newRouter.use(handlers);
        }
        this.router = newRouter;
    }
}
exports.ReloadRouter = ReloadRouter;
//# sourceMappingURL=index.js.map