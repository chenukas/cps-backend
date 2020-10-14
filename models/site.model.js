const mongoose = require("mongoose");
const { Schema } = mongoose;

const siteSchema = new mongoose.Schema(
  {
    siteNo: { type: String, required: true, unique: true },
    siteName: { type: String, required: true },
    siteManagerName: { type: Schema.Types.ObjectId, ref: "User" },
    location: { type: String, required: true },
    budget: { type: Number, required: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("site", siteSchema);
