const mongoose = require("mongoose");

const signUpTemplate = new mongoose.Schema({
  name: { type: String, require: true },
  document: { type: Number, require: true },
  email: { type: String, require: true },
  cellphone: { type: Number, require: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("usuarios", signUpTemplate);
