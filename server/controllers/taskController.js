const Task = require("../models/Task");

// get tasks by category controller
const getTasksByCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params || {};
    let tasks;
    console.log("category", categoryId);

    if (categoryId === "all-tasks") {
      tasks = await Task.find();
    } else if (categoryId === "inbox") {
      tasks = await Task.find({ category: "inbox" });
    } else {
      // get all tasks by category
      tasks = await Task.find({ category: categoryId });
    }

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

    if (timerType === "countdown") {
      const { startTimeHours, startTimeMinutes, endTimeHours, endTimeMinutes } =
        timer || {};

      startTime.setHours(startTimeHours, startTimeMinutes, 0, 0);
      endTime.setHours(endTimeHours, endTimeMinutes, 0, 0);
    } else if (timerType === "stopwatch") {
      const { stopWatchHours, stopWatchMinutes, stopWatchSeconds } =
        timer || {};

      const currentTime = new Date();

      console.log("stopwatch hours", Number(stopWatchHours));

      startTime.setHours(
        currentTime.getHours(),
        currentTime.getMinutes(),
        0,
        0
      );
      endTime.setHours(
        currentTime.getHours() + Number(stopWatchHours),
        currentTime.getMinutes() + Number(stopWatchMinutes),
        stopWatchSeconds,
        0
      );
    } else if (timerType === "pomodoro") {
      const {
        durationHours,
        durationMinutes,
        intervals,
        shortBreakMinutes,
        shortBreakSeconds,
        longBreakMinutes,
        longBreakSeconds,
      } = timer || {};

      const time = Number(durationHours) * 60 + Number(durationMinutes);

      const breakTime =
        shortBreakMinutes || shortBreakSeconds
          ? Number(shortBreakMinutes) + Number(shortBreakSeconds)
          : Number(longBreakMinutes) + Number(longBreakSeconds);

      const fullTime = time + breakTime * intervals;

      const fullTimeBreakTime = fullTime / intervals;

      for (let i = 1; i <= intervals; i++) {
        // break start time
        const breakStartFullTime = fullTimeBreakTime * i - breakTime;
        const breakStartRemainingMinutes = breakStartFullTime % 60;
        const totalMinutesForHours =
          (breakStartFullTime - breakStartRemainingMinutes) / 60;

        const breakStartTime = new Date();
        startTime.setHours(
          breakStartTime.getHours() + Number(totalMinutesForHours),
          breakStartTime.getMinutes() + Number(breakStartRemainingMinutes),
          0,
          0
        );

        // break end time
        const breakEndFullTime = fullTimeBreakTime * i;
        const breakEndRemainingMinutes = breakStartFullTime % 60;
        const totalMinutesForEndHours =
          (breakEndFullTime - breakEndRemainingMinutes) / 60;

        // console.log("totalMinutesForEndHours", totalMinutesForEndHours);

        // console.log("breakEndRemainingMinutes", breakEndRemainingMinutes);

        const breakEndTime = new Date();
        breakEndTime.setHours(
          breakEndTime.getHours() + Number(totalMinutesForEndHours),
          breakEndTime.getMinutes() + Number(breakEndRemainingMinutes),
          0,
          0
        );

        intervalsBreakPoints.push({
          breakStart: breakStartTime,
          breakEnd: breakEndTime,
        });
      }

      // convert minute to hours
      const remainingMinutes = fullTime % 60;
      const totalMinutesForHours = (fullTime - remainingMinutes) / 60;

      const totalHours = totalMinutesForHours;

      const currentTime = new Date();

      startTime.setHours(
        currentTime.getHours(),
        currentTime.getMinutes(),
        0,
        0
      );
      endTime.setHours(
        currentTime.getHours() + Number(totalHours),
        currentTime.getMinutes() + Number(remainingMinutes),
        0,
        0
      );
    }

    // generate task status
    let status = "upcoming";

    if (new Date(startTime) > new Date()) {
      status = "future";
    } else if (Object.keys(timer)?.length === 0) {
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
      category: category?._id ? category : "inbox",
      createdOn,
      tags,
      description,
      user: _id,
      status,
      editableTime: timer,
      timerType,
      intervalsBreakPoints,
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

// start task controller
const startTaskController = async (req, res) => {
  try {
    const { id } = req.params || {};
    const { pauseStartTime, pauseEndTime } = req.body || {};

    const task = await Task.findById(id);

    if (task?._id) {
      let startTime = new Date(task?.startTime);
      let endTime = new Date(task?.endTime);
      console.log(startTime);

      const pauseStartTimeNow = new Date(pauseStartTime);
      const pauseEndTimeNow = new Date(pauseEndTime);

      // get the difference between puase start time and puase end time
      const hoursDifference =
        pauseEndTimeNow.getHours() - pauseStartTimeNow.getHours();
      const minutesDifference =
        pauseEndTimeNow.getMinutes() - pauseStartTimeNow.getMinutes();
      const secondsDifference =
        pauseEndTimeNow.getSeconds() - pauseStartTimeNow.getSeconds();
      const miliSecondsDifference =
        pauseEndTimeNow.getMilliseconds() - pauseStartTimeNow.getMilliseconds();

      // plus the pause diffrence time in start time
      startTime = startTime.setHours(
        startTime.getHours() + hoursDifference,
        startTime.getMinutes() + minutesDifference,
        startTime.getSeconds() + secondsDifference,
        startTime.getMilliseconds() + miliSecondsDifference
      );

      // plus the pause diffrence time in end time
      endTime = endTime.setHours(
        endTime.getHours() + hoursDifference,
        endTime.getMinutes() + minutesDifference,
        endTime.getSeconds() + secondsDifference,
        endTime.getMilliseconds() + miliSecondsDifference
      );

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
      console.log("hours now", hoursNow);

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

      console.log("currentDate", currentDate);
      console.log("endCurrentTime", endCurrentTime);

      task.startTime = currentDate;
      task.endTime = endCurrentTime;

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

module.exports = {
  getTasksByCategoryController,
  createNewTaskController,
  deleteTaskController,
  updateTaskStatusController,
  updateTaskController,
  startTaskController,
  restartTaskController,
};
