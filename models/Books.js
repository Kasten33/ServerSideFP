const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date_published: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  ongoing: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("Book", BookSchema);
