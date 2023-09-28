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
    category: String,
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
    intervals: Number,
    completedIntervals: {
      type: Number,
      default: 0,
    },
    shortBreakMinutes: String,
    shortBreakSeconds: String,
    longBreakMinutes: String,
    longBreakSeconds: String,
    breakStart: Date,
    breakEnd: Date,
  },
  { timestamps: true }
);

const Task = model("Task", taskSchema);

module.exports = Task;
