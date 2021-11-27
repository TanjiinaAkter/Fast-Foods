const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

exports.adminLoginPostController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(403).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      { email, name: admin.name },
      process.env.API_SECRET_KEY
    );
    res.status(200).json({
      message: "Successfully logged!",
      token,
      isLoggedIn: true,
      admin: { name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.adminLoginVerify = async (req, res, next) => {
  const token = req.headers["x-admin-auth-token"];
  if (!token) {
    return res.status(401).json(false);
  }
  try {
    const { email } = jwt.verify(token, process.env.API_SECRET_KEY);
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json(false);
    }
    res.status(200).json({
      isLoggedIn: true,
      admin: { name: admin.name, email: admin.email },
    });
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
