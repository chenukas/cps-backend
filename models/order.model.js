const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    orderID: {
      type: String,
      required: true
    },
    requisitionID: {
      type: Schema.Types.ObjectId, ref: "Requisition"
    },
    status: {
      type: String,
      required: true
    },
    delivery: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);