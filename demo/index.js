"use strict";
const index_1 = require("../index");
const express = require("express");
const reloadRouter = new index_1.ReloadRouter();
const app = express();
app.use(reloadRouter.handler());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}...`);
});
let count = 1;
setInterval(() => {
    console.log(count++);
    reloadRouter.routes(new index_1.ReloadRoute("get", "/*", (req, res, next) => {
        console.log("called middleware");
        next();
    }), new index_1.ReloadRoute("get", "/", (req, res) => res.send("Hello " + count)));
}, 1000);
//# sourceMappingURL=index.js.map