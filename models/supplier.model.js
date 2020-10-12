const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
    {
        supId : { type: String, required: true, unique: true },
        supName : { type: String, required: true },
        supLocation : { type: String, required: true },
        supEmail : { type: String, required: true },
        supTel : { type: Number, required: true },
    },

    { timestamps: true }

);

module.exports = mongoose.model( 'supplier', supplierSchema );