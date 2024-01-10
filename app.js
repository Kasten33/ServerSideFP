const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");

const app = express();
const port = 3000;

app.use(cors()).use(express.json()).use("/", require("./routes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
