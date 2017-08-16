"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const express = require("express");
const reloadRouter = new index_1.ReloadRouter();
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
    newRouter.all("/*", (req, res, next) => {
        console.log("called all middleware");
        next();
    });
    newRouter.get("/", (req, res, next) => {
        res.send("Current route " + count);
    });
    for (let i = 0; i < count; i++) {
        newRouter.get("/" + i, (req, res, next) => {
            res.send("Hello " + i);
        });
    }
    reloadRouter.reload([newRouter]);
}, 2000);
//# sourceMappingURL=index.js.map