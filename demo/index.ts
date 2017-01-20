import {Router, Route, HandlebarsView, MVC, Controller} from "../index";
import {Request} from "express";

const router = new Router();

import * as express from "express";
const app = express();

app.use(router.handler());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}...`);
});


const jimmyController : Controller = async (req) => {
    return { name: "Alan", hometown: "Somewhere, TX", lastUpdate : new Date(),
    kids: [{name: "Jimmy", age: "12"}, {name: "Sally", age: "4"}]};
  };

const personDetailView = new HandlebarsView(`
<p>Hello, my name is {{name}}.
I am from {{hometown}}. I have {{kids.length}} kids:</p>
<ul>
{{#kids}}
<li>{{name}} is {{age}}</li>
{{/kids}}
</ul>
<p>Last update {{lastUpdate}}</p>`);

// This interval is to demostrate that I can change routes dynamically
let count = 1;
setInterval(() => {

  console.log(count++);

  router.routes(
    new Route(
      "get",
      "/*",
      (req, res, next) => {
        console.log("called middleware");
        next();
      }
    ),
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
        next();
      },
      MVC.handler(jimmyController, personDetailView)
    )
  );

}, 1000);
