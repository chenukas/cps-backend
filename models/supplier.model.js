const mongoose = require("mongoose");
const { Schema } = mongoose;

const supplierSchema = new Schema(
  {
    supId: { type: String, required: true, unique: true },
    supName: { type: String, required: true },
    supLocation: { type: String, required: true },
    supEmail: { type: String, required: true },
    supTel: { type: String, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: "item" }],
  },

  { timestamps: true }
);

module.exports = mongoose.model("supplier", supplierSchema);
