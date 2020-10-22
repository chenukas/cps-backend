const router = require("express").Router();
const requisitionController = require("../controllers/requisition.controller");

/**
 * Requisition routes
 * */
router.post("/requisitions", requisitionController.addRequisition);
router.get("/requisitions", requisitionController.viewRequisition);
router.get("/requisitions/:id", requisitionController.viewRequisitionById);
router.put(
  "/requisitions/:id/approve",
  requisitionController.approveRequisitionById
);
router.put(
  "/requisitions/:id/decline",
  requisitionController.declineRequisitionById
);
router.get("/getRequisitionNumber", requisitionController.getNextRequisitionID);
router.get(
  "/viewPlaceRequisition",
  requisitionController.viewRequisitionByPlace
);
router.post('/viewRequisitions', requisitionController.viewRequisitionByManagerID);

module.exports = router;
