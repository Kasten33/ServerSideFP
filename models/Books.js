const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  date_published: {
    type: Date,
    required: false,
  },
  ongoing: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("Book", BookSchema);
