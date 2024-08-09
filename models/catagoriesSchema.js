const mongoose = require("mongoose");

const catagorySchema = new mongoose.Schema({
  catagory: { type: String, required: true },
});

module.exports = mongoose.model("Catagorie", catagorySchema);
