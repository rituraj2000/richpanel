const dbConfig = require("./config/dbConfig");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
var cors = require("cors")
// const passport = require("passport");

const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
