const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
  {
    siteNo: { type: String, required: true, unique: true },
    siteName: { type: String, required: true },
    location: { type: String, required: true },
    budget: { type: Number, required: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model('site', siteSchema);
