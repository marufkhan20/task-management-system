const { consumers } = require("nodemailer/lib/xoauth2");
const Task = require("../models/Task");

// get tasks by category controller
const getTasksByCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params || {};

    // get all tasks by category
    const tasks = await Task.find({ category: categoryId });

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!",
    });
  }
};

// create new task controller
const createNewTaskController = async (req, res) => {
  try {
    const {
      name,
      startTime,
      endTime,
      category,
      createdOn,
      tags,
      description,
      editableTime,
      timerType,
    } = req.body || {};

    const { _id } = req.user || {};

    // generate task status
    let status;

    if (new Date(startTime) > new Date()) {
      status = "upcoming";
    } else if (
      new Date(startTime) <= new Date() &&
      new Date(endTime) >= new Date()
    ) {
      status = "ongoing";
    } else {
      status = "completed";
    }

    // create new task
    const newTask = new Task({
      name,
      startTime,
      endTime,
      category,
      createdOn,
      tags,
      description,
      user: _id,
      status,
      editableTime,
      timerType,
    });

    await newTask.save();

    if (newTask?._id) {
      res.status(201).json(newTask);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!",
    });
  }
};

// delete task controller
const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params || {};
    const deletedTask = await Task.findByIdAndDelete(id);
    res.status(200).json(deletedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

// update task status controller
const updateTaskStatusController = async (req, res) => {
  try {
    const { status } = req.body || {};
    const { id } = req.params || {};
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    // console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

// update task controller
const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params || {};
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

module.exports = {
  getTasksByCategoryController,
  createNewTaskController,
  deleteTaskController,
  updateTaskStatusController,
  updateTaskController,
};
