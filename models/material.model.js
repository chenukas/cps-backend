const mongoose = require("mongoose");
const { Schema } = mongoose;

const materialSchema = new Schema(
  {
    materialName: { type: String, required: true },
    quantity: { type: Number },
    unitPrice: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);
