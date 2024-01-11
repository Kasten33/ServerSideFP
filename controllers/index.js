const mongodb = require("../db/connect");
const OnjectID = require("mongodb").ObjectID;

const coolF = (Req, res) => {
  res.json("Hello from my route!");
};

module.exports = { coolF };
