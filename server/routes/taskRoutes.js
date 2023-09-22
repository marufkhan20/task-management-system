const {
  createNewTaskController,
  getTasksByCategoryController,
  deleteTaskController,
  updateTaskStatusController,
  updateTaskController,
  restartTaskController,
  startTaskController,
  updatePomodoroTaskIntervalsController,
  updatePomodoroTaskBreakController,
} = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get(
  "/by-category/:categoryId",
  authMiddleware,
  getTasksByCategoryController
);

router.post("/", authMiddleware, createNewTaskController);

router.delete("/:id", authMiddleware, deleteTaskController);

// update task status
router.put(
  "/update-task-status/:id",
  authMiddleware,
  updateTaskStatusController
);

// start task
router.put("/start-task/:id", authMiddleware, startTaskController);

// restart task
router.put("/restart-task/:id", authMiddleware, restartTaskController);

// update pomodoro task intervals
router.put(
  "/update-pomodoro-intervals/:id",
  authMiddleware,
  updatePomodoroTaskIntervalsController
);

// update pomodoro task intervals
router.put(
  "/update-pomodoro-break/:id",
  authMiddleware,
  updatePomodoroTaskBreakController
);

// update task
router.put("/:id", authMiddleware, updateTaskController);

module.exports = router;
