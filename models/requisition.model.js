const mongoose = require("mongoose");
const { Schema } = mongoose;

const requisitionSchema = new Schema(
  {
    requisitionID: {
      type: String,
      required: true,
    },
    siteManagerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    requestDate: {
      type: String,
      required: true,
    },
    requireDate: {
      type: String,
      required: true,
    },
    siteId: {
      type: Schema.Types.ObjectId,
      ref: "site",
    },
    supplierName: {
      type: Schema.Types.ObjectId, ref: "supplier",
      required: true
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "item" },
        quantity: { type: Number },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true
    },
    place: {
      type: Boolean
    },
    comments: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Requisition", requisitionSchema);
