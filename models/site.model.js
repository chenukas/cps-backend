const mongoose = require("mongoose");
const { Schema } = mongoose;

const siteSchema = new Schema(
  {
    siteNo: { type: String, required: true, unique: true },
    siteName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phoneNo: { type: String, required: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("site", siteSchema);
