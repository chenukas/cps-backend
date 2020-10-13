const mongoose = require("mongoose");
const { Schema } = mongoose;

const requisitionSchema = new Schema(
  {
    requisitionID: {
      type: String,
      required: true
    },
    siteId: { 
      type: String,
      required: true
    },
    siteManagerName: { 
      type: String,
      required: true
    },
    requiredItems: { 
      type: String,
      required: true
    },
    ItemsQty: {
      type: String,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    approvedDate: {
      type: String,
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
