const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Order Model
 * */
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
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);