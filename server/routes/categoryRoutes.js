const {
  createCategoryController,
  getAllCategoriesByUserController,
  getSingleCategoryController,
} = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

// get all categories by user id
router.get("/by-user", authMiddleware, getAllCategoriesByUserController);

// get single category
router.get("/:id", authMiddleware, getSingleCategoryController);

// create new category
router.post("/create", authMiddleware, createCategoryController);

module.exports = router;
