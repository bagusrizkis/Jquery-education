require("dotenv").config();

const express = require("express");
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening :: http://localhost:${PORT}`);
});
