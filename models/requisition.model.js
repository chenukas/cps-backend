const mongoose = require("mongoose");
const { Schema } = mongoose;

const requisitionSchema = new Schema(
  {
    requisitionNo: { type: String, required: true, unique: true },
    siteId: { type: Schema.Types.ObjectId, ref: "sites" },
    siteManagerId: { type: Schema.Types.ObjectId, ref: "users" },
    approvedDate: { type: Date },
    totalAmount: { type: Number, required: true },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Requisition", requisitionSchema);
