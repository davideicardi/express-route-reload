"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Handlebars = require("handlebars");
class HandlebarsView {
    constructor(template) {
        this.template = template;
    }
    render(model, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.compiledTemplate) {
                this.compiledTemplate = Handlebars.compile(this.template);
            }
            return this.compiledTemplate(model, options);
        });
    }
}
exports.HandlebarsView = HandlebarsView;
class MVC {
    static handler(controller, view, options) {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            let model = yield controller(req);
            let output = yield view.render(model, options);
            res.send(output);
        });
    }
}
exports.MVC = MVC;
//# sourceMappingURL=mvc.js.map