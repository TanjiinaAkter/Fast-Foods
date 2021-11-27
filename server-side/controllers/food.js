const Food = require("../models/Food");

// Get single food
exports.getSingleFoodGetController = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findOne({ _id: id });
    console.log({ id });
    res.status(200).json({ food });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};
// Get all food
exports.getAllFoodGetController = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json({ foods });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};
// Only admin food can be adding and this controller is only accessible to admin
exports.addFoodPostController = async (req, res) => {
  // Data extracted from the body of the request
  const { name, price, stockStatus, description, img, ratings } = req.body;

  // Simple validation for input data
  if (!name || !price || !stockStatus || !description || !img || !ratings) {
    return res.status(403).json({
      message: "Must have to provide all required fields to add a product",
    });
  }
  try {
    // Create a food
    const createFood = await new Food({
      name,
      price,
      stockStatus,
      description,
      img,
      ratings,
    });
    const createdFood = await createFood.save();
    res
      .status(201)
      .json({ message: "Successfully added new food!", food: createdFood });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// To update food data by admin
exports.updateFoodPutController = async (req, res) => {
  // Data extracted from the body of the request and also exracted id from params
  const { name, price, stockStatus, description, img, ratings } = req.body;
  const { id } = req.params;
  try {
    const hasFood = await Food.findOne({ _id: id });
    if (!hasFood) {
      return res
        .status(503)
        .json({ message: "Currently, this food is not available in DB" });
    }
    const updatedFood = await Food.findOneAndUpdate(
      {
        _id: id,
      },
      {
        name: name || hasFood.name,
        price: price || hasFood.price,
        stockStatus: stockStatus || hasFood.stockStatus,
        description: description || hasFood.description,
        img: img || hasFood.img,
        ratings: ratings || hasFood.ratings,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Successfully updated food!", food: updatedFood });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};
// To delete food from the DB by admin
exports.deleteFoodDeleteController = async (req, res) => {
  const { id } = req.params;
  try {
    const hasFood = await Food.findOne({ _id: id });
    if (!hasFood) {
      return res
        .status(503)
        .json({ message: "Currently, this food is not available in DB" });
    }
    await Food.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Successfully deleted food!" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};
