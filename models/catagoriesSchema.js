const mongoose = require("mongoose");

const catagorySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model("Catagorie", catagorySchema);
