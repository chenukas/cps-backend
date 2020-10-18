const mongoose = require("mongoose");
const { Schema } = mongoose;

//item model
const itemSchema = new Schema(
  {
    itemName: { type: String, required: true },
    quantity: { type: Number },
    unitPrice: { type: Number },
    description: { type: String },
    supplier: { type: Schema.Types.ObjectId, ref: "supplier" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("item", itemSchema);
