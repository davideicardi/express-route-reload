import {ReloadRouter, ReloadRoute} from "../index";
import * as express from "express";

const reloadRouter = new ReloadRouter();
const app = express();

app.use(reloadRouter.handler());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}...`);
});

// This interval is to demostrate that I can change routes dynamically
let count = 1;
setInterval(() => {

  console.log(count++);

  reloadRouter.routes([
    new ReloadRoute(
      "all",
      "/*",
      (req, res, next) => {
        console.log("called all middleware");
        next();
      }
    ),
    new ReloadRoute(
      "get",
      "/*",
      (req, res, next) => {
        console.log("called middleware");
        next();
      }
    ),
    new ReloadRoute(
      "get",
      "/",
      (req, res) => res.send("Hello " + count)
    )
  ]);

}, 1000);
