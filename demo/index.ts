import {Router, Route, HandlebarsView, MVC, Controller} from "../index";
import {Request} from "express";

const router = new Router();

import * as express from "express";
const app = express();

app.use(router.handler());

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening ...");
});


function getController() : Controller {
    return async (req) => {
        return { name: "Alan", hometown: "Somewhere, TX", lastUpdate : new Date(),
                kids: [{name: "Jimmy", age: "12"}, {name: "Sally", age: "4"}]};
    };
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


    return new HandlebarsView(template);
}

let count = 1;
setInterval(() => {

    console.log(count++);

    router.routes(
        new Route(
            "get", 
            "/", 
            (req, res) => res.send("Hello " + count)
            ),
        new Route(
            "get",
            "/view",
            (req, res, next) => {
                res.setHeader("x-test", "ciao");
                console.log("called middleware");
                next();
            },
            MVC.handler(getController(), getView())
            )
        );

}, 1000);
