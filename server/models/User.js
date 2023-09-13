const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "John Doe",
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
    },
    tasks: {
      type: [Schema.Types.ObjectId],
      ref: "Task",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
