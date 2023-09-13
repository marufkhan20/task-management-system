const Category = require("../models/Category");
const User = require("../models/User");

// get all categories by user id controller
const getAllCategoriesByUserController = async (req, res) => {
  try {
    const { _id } = req.user || {};

    // get all categories
    const categories = await Category.find({ user: _id });

    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

// get single category controller
const getSingleCategoryController = async (req, res) => {
  try {
    const { id } = req.params || {};
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

// create new category controller
const createCategoryController = async (req, res) => {
  try {
    const { title, color } = req.body || {};
    const { _id } = req.user || {};

    // create new category
    const newCategory = new Category({
      title,
      color,
      user: _id,
    });

    await newCategory.save();

    // update user category objects
    const user = await User.findById(_id);
    user.categories = [...user.categories, newCategory?._id];
    await user.save();

    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

module.exports = {
  getAllCategoriesByUserController,
  createCategoryController,
  getSingleCategoryController,
};
