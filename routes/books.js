const express = require("express");
const router = express.Router();

const BookController = require("../controllers");

router.get("/", BookController.getAllBooks);
router.post("/", BookController.createBook);
router.patch("/:id", BookController.updateBook);
router.delete("/:id", BookController.deleteBook);

module.exports = router;
