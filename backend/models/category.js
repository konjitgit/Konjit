const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  items: [
    {
      title: {
        type: String,
        required: true,
      },
      subItems: {
        type: [String],
        required: true,
      },
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
