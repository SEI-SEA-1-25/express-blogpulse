// requried modules
const express = require("express");
const db = require("./models");
const rowdy = require("rowdy-logger");
const morgan = require("morgan");
// config express app
const app = express();
const PORT = 3000;
const rowdyResults = rowdy.begin(app);
// express middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));


// GET /authors - READ all authors
app.use("/authors", require("./controllers/authors"));
app.use("/articles", require("./controllers/articles"));
app.use("/articles", require("./controllers/tags"))
//
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  rowdyResults.print();
});

