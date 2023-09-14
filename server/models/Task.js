const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    name: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startTime: Date,
    endTime: Date,
    category: {
      type: String,
    },
    tags: String,
    createdOn: String,
    description: String,
    status: {
      type: String,
      required: true,
    },
    editableTime: {
      type: {},
    },
    timerType: String,
  },
  { timestamps: true }
);

const Task = model("Task", taskSchema);

module.exports = Task;
