const mongoose = require("mongoose");

const userModels = new mongoose.Schema({
  name: { type: String, require: true },
  document: { type: Number, require: true },
  email: { type: String, require: true },
  cellphone: { type: Number, require: true },
  date: { type: Date, default: Date.now },
  wallet: { type: Number, default: 0 },
});

module.exports = mongoose.model("usuarios", userModels);
