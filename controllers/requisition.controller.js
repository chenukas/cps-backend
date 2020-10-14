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

const updaterequisitionById = (req, res) => {

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

    Requisition.findByIdAndUpdate(req.params.id, {
        requisitionID: req.body.requisitionID,
        siteId: req.body.siteId,
        siteManagerName: req.body.siteManagerName,
        requiredItems: req.body.requiredItems,
        ItemsQty: req.body.ItemsQty,
        totalAmount: req.body.totalAmount,
        approvedDate: req.body.approvedDate,
    }, {new: true}).then(result => {
        res.status(200).json({
            success: true,
            data: result
        });
    }).catch(err => {
        res.status(503).json({
            success: false,
            message: err.message
        });
    });

};

const updateStatusById = (req, res) => {
    Requisition.findByIdAndUpdate(req.params.id, {
        status: req.body.status,
    }, {new: true}).then(result => {
        res.status(200).json({
            success: true,
            data: result
        });
    }).catch(err => {
        res.status(503).json({
            success: false,
            message: err.message
        });
    });
};

const getNextRequisitionID = (req, res) => {

    const start = new Date();
    start.setMonth(0, 1);
    start.setHours(0, 0, 0, 0);
  
    const end = new Date();
    end.setMonth(11, 31);
    end.setHours(23, 59, 59, 999);
  
    Requisition.find({ createdAt: { $gt: start, $lt: end } }, "requisitionID")
      .sort("-createdAt")
      .then((result) => {
        let nextNum =
          result.length === 0
            ? 1
            : parseInt(result.shift().requisitionID.slice(-4)) + 1;
  
        const formattedCount = "000".concat(nextNum).slice(-4);
        return res.status(200).json({
          success: true,
          data: `R${start.getFullYear().toString().slice(-2)}${formattedCount}`,
        });
      })
      .catch((err) =>
        res.status(500).json({
          success: false,
          message: err.message,
        })
      );
  };

module.exports = {
    addRequisition,
    viewRequisition,
    viewRequisitionById,
    updaterequisitionById, 
    updateStatusById,
    getNextRequisitionID
}