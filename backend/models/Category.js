const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, index: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  image: String,
});

module.exports = mongoose.model("Category", categorySchema);
