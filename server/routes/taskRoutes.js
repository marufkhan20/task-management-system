const {
  createNewTaskController,
  getTasksByCategoryController,
  deleteTaskController,
  updateTaskStatusController,
  updateTaskController,
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

router.put("/:id", authMiddleware, updateTaskController);

module.exports = router;
