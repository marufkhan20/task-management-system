const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: String,
    color: String,
  },
  { timestamps: true }
);

const Category = model("Category", categorySchema);

module.exports = Category;
