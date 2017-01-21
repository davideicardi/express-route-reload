import {RequestHandler, Request} from "express";
import * as Handlebars from "handlebars";

export interface IView {
    render(model: any, options: any): Promise<string>;
}

export interface Controller {
    (req: Request): Promise<any>;
}

export class HandlebarsView implements IView {
    private compiledTemplate: HandlebarsTemplateDelegate;

    constructor(
        private template: string) {
    }

    async render(model: any, options: any): Promise<string> {
        if (!this.compiledTemplate) {
            this.compiledTemplate = Handlebars.compile(this.template);
        }

        return this.compiledTemplate(model, options);
    }
}

export class MVC {
    static handler(controller: Controller, view: IView, options?: any): RequestHandler {
        return async (req, res) => {
            let model = await controller(req);
            let output = await view.render(model, options);

            res.send(output);
        };
    }
}
