const express = require("express");
const cors = require("cors");
const mongodb = require("./db/connect");

const URL = "http://localhost:3000/books";
fetch(URL);

const app = express();
const port = process.env.port || 3000;

app
  .use(cors())
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(
      "\x1b[36m%s\x1b[0m",
      `Connected to DB and listening on port: ${port}`
    );
  }
});
