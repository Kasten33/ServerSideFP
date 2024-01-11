const routes = require("express").Router();
const controller = require("../controllers");

routes.get("/", controller.getAllBooks);
routes.get("/books/:id", controller.getSingleBook);
routes.post("/books", controller.createBook);
routes.patch("/books/:id", controller.updateBook);
routes.delete("/books/:id", controller.deleteBook);

module.exports = routes;
