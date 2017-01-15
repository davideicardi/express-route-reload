"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const index_1 = require("../index");
const router = new index_1.Router();
const express = require("express");
const app = express();
app.use(router.handler());
app.listen(process.env.PORT || 3000, () => {
    console.log("Listening ...");
});
function getController() {
    return (req) => __awaiter(this, void 0, void 0, function* () {
        return { name: "Alan", hometown: "Somewhere, TX", lastUpdate: new Date(),
            kids: [{ name: "Jimmy", age: "12" }, { name: "Sally", age: "4" }] };
    });
}
function getView() {
    let template = `
    <p>Hello, my name is {{name}}. 
    I am from {{hometown}}. I have {{kids.length}} kids:</p>
    <ul>
        {{#kids}}
        <li>{{name}} is {{age}}</li>
        {{/kids}}
    </ul>
    <p>Last update {{lastUpdate}}</p>`;
    return new index_1.HandlebarsView(template);
}
let count = 1;
setInterval(() => {
    console.log(count++);
    router.routes(new index_1.Route("get", "/", (req, res) => res.send("Hello " + count)), new index_1.Route("get", "/view", (req, res, next) => {
        res.setHeader("x-test", "ciao");
        console.log("called middleware");
        next();
    }, index_1.MVC.handler(getController(), getView())));
}, 1000);
//# sourceMappingURL=index.js.map