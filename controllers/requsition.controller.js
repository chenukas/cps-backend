const Requisition = require('../models/requisition.model');

const addRequisition = (req, res) => {

    if(!req.body.requisitionID) {
        return res.status(400).json({
            success: false,
            message: "Requisition ID is undefined"
        });
    }

    if(!req.body.siteId){
        return res.status(400).json({
            success: false,
            message: "Site ID is undefined"
        });
    }


    const requisition = new Requisition(req.body);

    requisition.save().then(result => {
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

const viewRequisition = (req, res) => {
    Requisition.find({}).then(result => {
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

const viewRequisitionById = (req, res) => {
    Requisition.findById(req.params.id).then(result => {
        res.status(200).json({
            success: true,
            data: result
        });
    }).catch(err => {
        res.status(502).json({
            success: false,
            message: err.message
        });
    });
}

module.exports = {
    addRequisition,
    viewRequisition,
    viewRequisitionById
}