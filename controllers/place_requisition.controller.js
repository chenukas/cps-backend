const PlaceRequisition = require('../models/place_requisition.model');
const mongoose = require("mongoose");

const addOrder = (req, res) => {

    if(!req.body.orderID) {
        return res.status(400).json({
            success: false,
            message: "Order ID is undefined"
        });
    }

    if(!req.body.requisitionID){
        return res.status(400).json({
            success: false,
            message: "Requisition ID is undefined"
        });
    }

    const placeRequisition = new PlaceRequisition(req.body);

    placeRequisition.requisitionID = mongoose.Types.ObjectId(req.body.requisitionID);

    placeRequisition.save().then(result => {
        res.status(200).json({
            success: true,
            data: result
        });     
    }).catch(err => {
        res.status(500).json({
            success: false,
            message: err.message
        });
    });
};

const viewOrder = (req, res) => {
    PlaceRequisition.find({})
        .populate("requisitionID")
        .then(result => {
            res.status(200).json({
                success: true,
                data: result
            });
        }).catch(err => {
            res.status(501).json({
                success: false,
                message: err.message
            });
        });
};

module.exports = {
    addOrder,
    viewOrder
}