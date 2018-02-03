import * as express from "express";
import {RequestHandler, Router, IRouterMatcher, Request} from "express";

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

	reload(handlers: RequestHandler[]) {
		const newRouter = express.Router();

		if (handlers.length) {
			newRouter.use(handlers);
		}

		this.router = newRouter;
	}
}
