const { Schema, model } = require("mongoose");

const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: [{
      type: String,
      required: true,
    }],
    country: {
      type:String,
      default: "Pakistan",
    },
    province: {
      type:String,
      default: "Pakistan",
    },
    city: {
      type:String,
      default: "Pakistan",
    },
    area: {
      type:String,
      default: "Pakistan",
    },
    propertyImages: [{
      type: String,
    }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  },
);

const Property = model("properties", propertySchema);

module.exports = Property;
