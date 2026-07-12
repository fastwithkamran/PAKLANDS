const Property = require("../models/property");

const handleAllProperties = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Property.find({ createdBy: id })
      .select({
        _id: 1,
        title: 1,
        province: 1,
        city: 1,
        area: 1,
        street: 1,
        price: 1,
        propertyImages: { $slice: 1 },
      })
      .lean();

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error All Properties ", error);
    return res
      .status(500)
      .json({ msg: "Error listing all properties" });
  }
};

module.exports = handleAllProperties;
