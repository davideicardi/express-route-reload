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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}...`);
});
const jimmyController = (req) => __awaiter(this, void 0, void 0, function* () {
    return { name: "Alan", hometown: "Somewhere, TX", lastUpdate: new Date(),
        kids: [{ name: "Jimmy", age: "12" }, { name: "Sally", age: "4" }] };
});
const personDetailView = new index_1.HandlebarsView(`
<p>Hello, my name is {{name}}.
I am from {{hometown}}. I have {{kids.length}} kids:</p>
<ul>
{{#kids}}
<li>{{name}} is {{age}}</li>
{{/kids}}
</ul>
<p>Last update {{lastUpdate}}</p>`);
let count = 1;
setInterval(() => {
    console.log(count++);
    router.routes(new index_1.Route("get", "/*", (req, res, next) => {
        console.log("called middleware");
        next();
    }), new index_1.Route("get", "/", (req, res) => res.send("Hello " + count)), new index_1.Route("get", "/view", (req, res, next) => {
        res.setHeader("x-test", "ciao");
        next();
    }, index_1.MVC.handler(jimmyController, personDetailView)));
}, 1000);
//# sourceMappingURL=index.js.map