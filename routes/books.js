const express = require("express");
const router = express.Router();

routes.post("/books", controller.createBook);
routes.patch("/books/:id", controller.updateBook);
routes.delete("/books/:id", controller.deleteBook);

module.exports = router;
