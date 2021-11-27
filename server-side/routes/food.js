const router = require("express").Router();

const {
  getSingleFoodGetController,
  getAllFoodGetController,
  addFoodPostController,
  updateFoodPutController,
  deleteFoodDeleteController,
} = require("../controllers/food");

// Auth middleware to verify admin
const isAuthenticatedAdmin = require("../middlewares/adminAuth");

router.get("/single/:id", getSingleFoodGetController);
router.get("/all", getAllFoodGetController);
router.post("/add", isAuthenticatedAdmin(), addFoodPostController);
router.put("/update/:id", isAuthenticatedAdmin(), updateFoodPutController);
router.delete(
  "/delete/:id",
  isAuthenticatedAdmin(),
  deleteFoodDeleteController
);

module.exports = router;
