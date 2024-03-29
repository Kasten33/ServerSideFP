const routes = require("express").Router();
const controller = require("../controllers");

routes.get("/books/:id", controller.getSingleBook);
routes.use("/books", require("./books"));

module.exports = routes;
