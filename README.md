# express-route-reload

Node.js module for express.js that allow to auto reload routes at runtime.

Idea based on: [Removing routes at runtime](https://github.com/expressjs/express/issues/2596).

Written and published as a typescript module.

## Installation

    npm install express-route-reload --save

## Usage


    import {ReloadRouter, ReloadRoute} from "express-route-reload";
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

      reloadRouter.routes(
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
      );

    }, 1000);
