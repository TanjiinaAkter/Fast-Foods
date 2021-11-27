const food = require("./food");
const order = require("./order");
const admin = require("./admin");
const paths = [
  {
    path: "food",
    controller: food,
  },
  {
    path: "order",
    controller: order,
  },

  {
    path: "admin",
    controller: admin,
  },
];

module.exports = (app) => {
  paths.forEach(({ path, controller }) => {
    app.use(`/api/${path}`, controller);
  });
};
