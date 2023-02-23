const mongoose = require('mongoose');

const userWhitelist = new mongoose.Schema({
  userId: String,
});

const model = mongoose.model("whitelist", userWhitelist);

module.exports = model;