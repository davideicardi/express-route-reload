# express-route-reload

Node.js module for express.js that allow to reload routes, Router objects, at runtime.

Idea based on: [Removing routes at runtime](https://github.com/expressjs/express/issues/2596).

Written and published as a typescript module.

## Installation

    npm install express-route-reload --save

## Usage


    import {ReloadRouter} from "../index";
    import * as express from "express";

    const reloadRouter = new ReloadRouter();
    const app = express();

    app.use(reloadRouter.handler());

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Listening at port ${PORT}...`);
    });

    // This interval is to demostrate that I can change routes dynamically
    let count = 0;
    setInterval(() => {
      console.log("/" + count);
      count++;

      const newRouter = express.Router();
      for (let i = 0; i < count; i++) {
        newRouter.get("/" + i, (req, res, next) => {
          res.send("Hello " + i);
        });
      }

      reloadRouter.reload([newRouter]);
    }, 2000);

Each 2 seconds I create a new route: "/1", "/2", "/3", ...
