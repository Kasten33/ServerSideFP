const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const coolF = (Req, res) => {
  res.json("Hello from my route!");
};

const getAllBooks = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("books").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const bookID = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("books")
      .find({ _id: bookID });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBook = async (req, res) => {
  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      date_published: req.body.date_published,
      ongoing: req.body.ongoing,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("books")
      .insertOne(book);
    if (response.acknowledged) {
      res.status(200).json({ message: "Book created successfully" });
    } else {
      res.status(500).json(response.error || "An error occurred");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookID = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      author: req.body.author,
      date_published: req.body.date_published,
      ongoing: req.body.ongoing,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("books")
      .replaceOne({ _id: bookID }, book);
    if (response.acknowledged) {
      res.status(200).json({ message: "Book updated successfully" });
    } else {
      res.status(500).json(response.error || "An error occurred");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookID = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("books")
      .deleteOne({ _id: bookID });
    if (response.acknowledged) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(500).json(response.error || "An error occurred");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  coolF,
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
