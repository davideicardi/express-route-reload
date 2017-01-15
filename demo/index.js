"use strict";
const index_1 = require("../index");
const fireApp = new index_1.FireApp();
const express = require("express");
const app = express();
app.use(fireApp.handler());
app.listen(process.env.PORT || 3000, () => {
    console.log("Listening ...");
});
let count = 1;
setInterval(() => {
    console.log(count++);
    fireApp.routes(new index_1.FireRoute("get", "/", (req, res) => {
        res.send("Hello " + count);
    }));
}, 1000);
//# sourceMappingURL=index.js.map