const Task = require("../models/Task");

// get tasks by category controller
const getTasksByCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params || {};
    const { _id } = req.user || {};

    let tasks;

    if (categoryId === "all-tasks") {
      tasks = await Task.find({ user: _id });
    } else if (categoryId === "inbox") {
      tasks = await Task.find({ category: "inbox", user: _id });
    } else {
      // get all tasks by category
      tasks = await Task.find({ category: categoryId, user: _id });
    }

    console.log("tasks", tasks);

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
    const { name, timer, category, createdOn, tags, description } =
      req.body || {};

    const { timerType } = timer || {};

    const { _id } = req.user || {};

    let startTime = new Date();
    let endTime = new Date();
    const intervalsBreakPoints = [];

    if (!timerType?.scheduleForLater) {
      if (timerType === "countdown") {
        const {
          startTimeHours,
          startTimeMinutes,
          endTimeHours,
          endTimeMinutes,
          countDownHours,
          countDownMinutes,
        } = timer || {};

        if (countDownHours || countDownMinutes) {
          const currentTime = new Date();

          startTime.setHours(
            currentTime.getHours(),
            currentTime.getMinutes(),
            currentTime.getSeconds(),
            0
          );
          endTime.setHours(
            currentTime.getHours() + Number(countDownHours),
            currentTime.getMinutes() + Number(countDownMinutes),
            currentTime.getSeconds(),
            0
          );
        } else {
          startTime.setHours(
            startTimeHours,
            startTimeMinutes,
            startTime.getSeconds(),
            0
          );
          endTime.setHours(
            endTimeHours,
            endTimeMinutes,
            startTime.getSeconds(),
            0
          );
        }
      } else if (timerType === "stopwatch") {
        const currentTime = new Date();
        startTime.setHours(
          currentTime.getHours(),
          currentTime.getMinutes(),
          currentTime.getSeconds(),
          0
        );
      } else if (timerType === "pomodoro") {
        const { durationHours, durationMinutes } = timer || {};

        const currentTime = new Date();

        startTime.setHours(
          currentTime.getHours(),
          currentTime.getMinutes(),
          currentTime.getSeconds(),
          currentTime.getMilliseconds()
        );
        endTime.setHours(
          currentTime.getHours() + Number(durationHours),
          currentTime.getMinutes() + Number(durationMinutes),
          currentTime.getSeconds(),
          currentTime.getMilliseconds()
        );
      }
    }

    // generate task status
    let status = "upcoming";

    if (timerType === "stopwatch") {
      status = "ongoing";
    } else if (new Date(startTime) > new Date()) {
      status = "future";
    } else if (Object.keys(timer)?.length === 0) {
      status = "upcoming";
    } else if (
      new Date(startTime) <= new Date() &&
      new Date(endTime) >= new Date()
    ) {
      status = "ongoing";
    }

    // else {
    //   status = "completed";
    // }

    // create new task
    const {
      intervals,
      shortBreakMinutes,
      shortBreakSeconds,
      longBreakMinutes,
      longBreakSeconds,
    } = timer || {};

    const newTask = new Task({
      name,
      startTime,
      endTime,
      category: category?._id ? category : "inbox",
      createdOn,
      tags,
      description,
      user: _id,
      status,
      editableTime: timer,
      timerType,
      intervalsBreakPoints,
      intervals,
      shortBreakMinutes,
      shortBreakSeconds,
      longBreakMinutes,
      longBreakSeconds,
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
    const { status, startTime } = req.body || {};
    const { id } = req.params || {};
    let updatedTask;

    if (startTime) {
      updatedTask = await Task.findByIdAndUpdate(
        id,
        { $set: { status, startTime } },
        { new: true }
      );
    } else {
      updatedTask = await Task.findByIdAndUpdate(
        id,
        { $set: { status } },
        { new: true }
      );
    }

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
    const { name, timer, category, createdOn, tags, description } =
      req.body || {};

    const { timerType } = timer || {};

    const { _id } = req.user || {};

    const { id } = req.params || {};

    const task = await Task.findById(id);

    let startTime = new Date();
    let endTime = new Date();

    if (!timerType?.scheduleForLater) {
      if (timerType === "countdown") {
        const {
          startTimeHours,
          startTimeMinutes,
          endTimeHours,
          endTimeMinutes,
          countDownHours,
          countDownMinutes,
        } = timer || {};

        if (countDownHours || countDownMinutes) {
          const currentTime = new Date();

          startTime.setHours(
            currentTime.getHours(),
            currentTime.getMinutes(),
            currentTime.getSeconds(),
            0
          );
          endTime.setHours(
            currentTime.getHours() + Number(countDownHours),
            currentTime.getMinutes() + Number(countDownMinutes),
            currentTime.getSeconds(),
            0
          );
        } else if (timerType === "stopwatch") {
          const currentTime = new Date();
          startTime.setHours(
            currentTime.getHours(),
            currentTime.getMinutes(),
            currentTime.getSeconds(),
            0
          );
        } else {
          startTime.setHours(
            startTimeHours,
            startTimeMinutes,
            startTime.getSeconds(),
            0
          );
          endTime.setHours(
            endTimeHours,
            endTimeMinutes,
            startTime.getSeconds(),
            0
          );
        }
      } else if (timerType === "pomodoro") {
        const { durationHours, durationMinutes } = timer || {};

        const currentTime = new Date();

        startTime.setHours(
          currentTime.getHours(),
          currentTime.getMinutes(),
          currentTime.getSeconds(),
          currentTime.getMilliseconds()
        );
        endTime.setHours(
          currentTime.getHours() + Number(durationHours),
          currentTime.getMinutes() + Number(durationMinutes),
          currentTime.getSeconds(),
          currentTime.getMilliseconds()
        );
      }
    }

    // generate task status
    let status = "upcoming";

    if (timerType === "stopwatch") {
      status = "ongoing";
    } else if (new Date(startTime) > new Date()) {
      status = "future";
    } else if (Object.keys(timer)?.length === 0) {
      status = "upcoming";
    } else if (
      new Date(startTime) <= new Date() &&
      new Date(endTime) >= new Date()
    ) {
      status = "ongoing";
    }

    // create new task
    const {
      intervals,
      shortBreakMinutes,
      shortBreakSeconds,
      longBreakMinutes,
      longBreakSeconds,
    } = timer || {};

    task.name = name;
    task.startTime = startTime;
    task.endTime = endTime;
    task.category = category?._id ? category : "inbox";
    task.createdOn = createdOn;
    task.tags = tags;
    task.description = description;
    task.user = _id;
    task.status = status;
    task.editableTime = timer;
    task.timerType = timerType;
    task.intervals = intervals;
    task.shortBreakMinutes = shortBreakMinutes;
    task.shortBreakSeconds = shortBreakSeconds;
    task.longBreakMinutes = longBreakMinutes;
    task.longBreakSeconds = longBreakSeconds;

    await task.save();

    if (task?._id) {
      res.status(201).json(task);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

// pause to start task controller
const startTaskController = async (req, res) => {
  try {
    const { id } = req.params || {};
    const { startTime, endTime } = req.body || {};

    const task = await Task.findById(id);

    if (task?._id) {
      task.startTime = startTime;
      task.endTime = endTime;
      await task.save();

      res.status(200).json(task);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!",
    });
  }
};

// restart task controller
const restartTaskController = async (req, res) => {
  try {
    const { id } = req.params || {};
    const task = await Task.findById(id);

    if (task?._id) {
      const startTime = new Date(task?.startTime);
      const endTime = new Date(task?.endTime);

      // Calculate the time difference in milliseconds
      const timeDifference = endTime - startTime;

      // Convert the time difference to hours, minutes, and seconds
      const hoursNow = Math.floor(timeDifference / 3600000); // 1 hour = 3600000 milliseconds
      const minutesNow = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60000 milliseconds
      const secondsNow = Math.floor((timeDifference % 60000) / 1000); // 1 second = 1000 milliseconds

      // set new time
      const endCurrentTime = new Date();
      endCurrentTime.setHours(
        endCurrentTime.getHours() + hoursNow,
        endCurrentTime.getMinutes() + minutesNow,
        endCurrentTime.getSeconds() + secondsNow,
        0
      );

      const currentDate = new Date();

      currentDate.setHours(
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds(),
        0
      );

      task.startTime = currentDate;
      task.endTime = endCurrentTime;

      if (task?.timerType === "pomodoro") {
        task.completedIntervals = 0;
        task.breakEnd = "";
        task.breakStart = "";
      }

      await task.save();

      res.status(200).json(task);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!",
    });
  }
};

// update pomodoro task intervals controller
const updatePomodoroTaskIntervalsController = async (req, res) => {
  try {
    const { id } = req.params || {};
    console.log("hello from intervals controller");

    const task = await Task.findById(id);

    if (task?._id && task.intervals !== task.completedIntervals + 1) {
      const currentTime = new Date();
      let startTime = new Date();
      let endTime = new Date();

      startTime = startTime.setHours(
        currentTime.getHours(),
        currentTime.getMinutes(),
        currentTime.getSeconds(),
        0
      );
      endTime = endTime.setHours(
        currentTime.getHours() + Number(task?.editableTime?.durationHours),
        currentTime.getMinutes() + Number(task?.editableTime?.durationMinutes),
        currentTime.getSeconds(),
        0
      );

      task.startTime = startTime;
      task.endTime = endTime;
      task.completedIntervals = task.completedIntervals + 1;
    } else {
      task.completedIntervals = task.completedIntervals + 1;
    }

    task.breakStart = "";
    task.breakEnd = "";

    await task.save();

    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

// update pomodoro task break controller
const updatePomodoroTaskBreakController = async (req, res) => {
  try {
    const { id } = req.params || {};
    const task = await Task.findById(id);

    if (task?._id) {
      const {
        shortBreakMinutes,
        shortBreakSeconds,
        longBreakMinutes,
        longBreakSeconds,
      } = task || {};

      const currentTime = new Date();
      let startTime = new Date();
      let endTime = new Date();

      if (task?.completedIntervals + 1 === task.intervals) {
        startTime.setHours(
          currentTime.getHours(),
          currentTime.getMinutes(),
          currentTime.getSeconds(),
          0
        );
        endTime.setHours(
          currentTime.getHours(),
          currentTime.getMinutes() + Number(longBreakMinutes),
          currentTime.getSeconds() + Number(longBreakSeconds),
          0
        );
      } else {
        startTime.setHours(
          currentTime.getHours(),
          currentTime.getMinutes(),
          currentTime.getSeconds(),
          0
        );
        endTime.setHours(
          currentTime.getHours(),
          currentTime.getMinutes() + Number(shortBreakMinutes),
          currentTime.getSeconds() + Number(shortBreakSeconds),
          0
        );
      }

      task.breakStart = startTime;
      task.breakEnd = endTime;

      await task.save();

      console.log("break task", task);

      res.status(200).json(task);
    }
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
  startTaskController,
  restartTaskController,
  updatePomodoroTaskIntervalsController,
  updatePomodoroTaskBreakController,
};
