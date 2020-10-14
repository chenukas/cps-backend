const mongoose = require("mongoose");
const { Schema } = mongoose;

const requisitionSchema = new Schema(
  {
    requisitionID: {
      type: String,
      required: true
    },
    siteManagerId: {
      type: Schema.Types.ObjectId, ref: "User"
    },
    requestDate: {
      type: String,
      required: true
    },
    requireDate: {
      type: String,
      required: true
    },
    siteId: {
      type: Schema.Types.ObjectId, ref: "site"
    },
    supplierName: {
      type: String,
      required: true
    },
    items: [
      {
        productId: { type: String },
        quantity: { type: Number }
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Requisition", requisitionSchema);
