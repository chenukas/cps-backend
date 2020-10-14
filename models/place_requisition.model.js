const mongoose = require("mongoose");
const { Schema } = mongoose;

const place_requisitionSchema = new Schema(
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

module.exports = mongoose.model("Place_Requisition", place_requisitionSchema);
