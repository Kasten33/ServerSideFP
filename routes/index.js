const routes = require("express").Router();
const controller = require("../controllers");

routes.get("/", controller.coolF);

module.exports = routes;
