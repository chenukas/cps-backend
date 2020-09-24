const mongoose = require("mongoose");
const { Schema } = mongoose;

const requsitionSchema = new Schema(
  {
    reqNo: { type: String, required: true },
    reqName: { type: String },
    siteName: { type: String },
    submitDate: { type: Date },
    reqDate: { type: Date },
    totAmount: { type: Number },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("requsitions", requsitionSchema);
