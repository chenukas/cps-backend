const Requisition = require("../models/requisition.model");

//method to get count of requisitions by status
const getRequisitionCountByStatus = async (req, res) => {
  try {
    const approvedReqCount = await Requisition.find({
      status: "Approved",
    }).count();
    const declinedReqCount = await Requisition.find({
      status: "Declined",
    }).count();
    const pendingReqCount = await Requisition.find({
      status: "Pending",
    }).count();

    return res.status(200).json({
      success: true,
      data: { approvedReqCount, declinedReqCount, pendingReqCount },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  getRequisitionCountByStatus,
};
