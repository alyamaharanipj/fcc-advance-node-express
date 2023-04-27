/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *       DO NOT EDIT THIS FILE
 *       For FCC testing purposes!
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

/*
 *  THIS FILE IS FOR freeCodeCamp TO BE ABLE TO TEST YOUR CODE PROPERLY
 *
 *  ~DO NOT EDIT!~
 *
 */

"use strict";

const fs = require("fs");

const allowedOrigins = [
  /^https?:\/\/([\w-]+\.)*freecodecamp.org/,
  /^https:\/\/([\w-]+\.)*gitpod.io/,
  /^http:\/\/localhost:\d+/,
];

module.exports = function (app) {
  app.use(function (req, res, next) {
    const origin = req.get("origin");
    if (allowedOrigins.some((regex) => regex.test(origin))) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      console.log(origin);
    }

    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

  app.route("/_api/app").get((req, res) => {
    console.log("requested");
    const appClone = { ...app };
    res.json(appClone);
  });

  app.route("/_api/server.js").get(function (req, res, next) {
    console.log("requested");
    fs.readFile(process.cwd() + "/server.js", function (err, data) {
      if (err) return next(err);
      res.send(data.toString());
    });
  });

  app.route("/_api/routes.js").get(function (req, res, next) {
    console.log("requested");
    fs.readFile(process.cwd() + "/routes.js", function (err, data) {
      if (err) return next(err);
      res.send(data.toString());
    });
  });

  app.route("/_api/auth.js").get(function (req, res, next) {
    console.log("requested");
    fs.readFile(process.cwd() + "/auth.js", function (err, data) {
      if (err) return next(err);
      res.send(data.toString());
    });
  });

  app.route("/_api/package.json").get(function (req, res, next) {
    console.log("requested");
    fs.readFile(process.cwd() + "/package.json", "utf-8", function (err, data) {
      if (err) return next(err);
      res.json(JSON.parse(data));
    });
  });

  app.get("/_api/app-info", function (req, res) {
    var hs = Object.keys(res._headers).filter(
      (h) => !h.match(/^access-control-\w+/)
    );
    var hObj = {};
    hs.forEach((h) => {
      hObj[h] = res._headers[h];
    });
    delete res._headers["strict-transport-security"];
    res.json({ headers: hObj });
  });

  app.get("/_api/app-stack", (req, res) => {
    console.log("requested");
    const stack = app._router.stack;
    res.json(JSON.stringify(stack));
  });
};
