const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, () =>
  console.log("database connected")
);
app.use(express.json());
app.use(cors());
app.use("/app", routesUrls);
app.use((req, res, next) => {
  const err = new Error("not found");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
app.listen(4000, () => console.log("server is running"));
