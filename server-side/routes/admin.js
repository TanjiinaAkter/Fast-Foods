const router = require("express").Router();
const {
  adminLoginPostController,
  adminLoginVerify,
} = require("../controllers/admin");

router.post("/login", adminLoginPostController);
router.get("/login/verify", adminLoginVerify);

module.exports = router;
