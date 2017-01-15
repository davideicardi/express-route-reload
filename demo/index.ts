import {FireApp, FireRoute} from "../index";
const fireApp = new FireApp();

import * as express from "express";
const app = express();

app.use(fireApp.handler());

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening ...");
});

let count = 1;
setInterval(() => {

    console.log(count++);

    fireApp.routes(
        new FireRoute(
            "get", 
            "/", 
            (req, res) => {
                res.send("Hello " + count);
            })
        );
}, 1000);
