const Order = require("../models/Order");
const Food = require("../models/Food");

// Get orders by user email
exports.getUserOrdersGetController = async (req, res) => {
  console.log("My");
  try {
    const { email } = req.query;
    const orders = await Order.find({ email }).populate({
      path: "food",
      select: "name price img",
    });
    console.log(orders);
    res.status(200).json({ orders });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Get All Orders of all users
exports.getAllOrdersGetController = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "food",
      select: "name price img",
    });

    res.status(200).json({ orders });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Order confirm by user
exports.orderPostController = async (req, res) => {
  // Data extracted from the body of the request
  const { fullname, address, phone, email, food, quantity } = req.body;
  try {
    const hasFood = await Food.find({ _id: food });
    if (hasFood.length === 0) {
      return res.status(503).json({
        message:
          "Unable to confirm order because this food is not exist in our stock!",
      });
    }
    // A Simple validation for input data
    if (!fullname || !address || !phone || !email) {
      return res.status(403).json({
        message: "Must have to provide all required fields to add a product",
      });
    }
    // Order save to DB
    const confirmOrder = new Order({
      status: "pending",
      fullname,
      address,
      phone,
      email,
      food,
      quantity,
    });
    const confirmedOrder = await confirmOrder.save();
    res.status(201).json({
      message:
        "We have received your order, please wait for the order to be completed.",
      order: confirmedOrder,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// To delete the user order
exports.deleteOrderDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOneAndDelete({
      _id: id,
    });
    res.status(200).json({
      message: "Succuessfully deleted the order",
      id: order._id,
    });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};
// To confirm,reject,pending and delete the order by admin
exports.changeOrderStatusPutController = async (req, res) => {
  // Data extracted from the body of the request
  const { id } = req.params;
  const { status } = req.body;
  try {
    const hasOrder = await Order.findOne({ _id: id });
    if (!hasOrder) {
      return res.status(503).json({ message: "Unavailable order" });
    }

    let or = await Order.findOneAndUpdate(
      {
        _id: id,
      },
      {
        status: status,
      },
      { new: true }
    );
    console.log({ or, hasOrder });
    res.status(200).json({
      message: `Succuessfully changed the order status is ${status}`,
    });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};
