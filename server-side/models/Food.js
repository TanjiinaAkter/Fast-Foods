const { model, Schema } = require("mongoose");
const shortid = require("shortid");

const strTypeRequiredField = {
  type: String,
  required: true,
};

const schema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  name: strTypeRequiredField,
  price: {
    type: Number,
    required: true,
  },
  stockStatus: strTypeRequiredField,
  description: strTypeRequiredField,
  img: strTypeRequiredField,
  ratings: {
    type: Number,
    required: true,
  },
});

const Food = new model("Food", schema);

module.exports = Food;
