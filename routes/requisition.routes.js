const router = require("express").Router();
const requisitionController = require("../controllers/requisition.controller");

router.post('/requisitions', requisitionController.addRequisition);
router.get('/requisitions', requisitionController.viewRequisition);
router.get('/requisitions/:id', requisitionController.viewRequisitionById);
router.put('/requisitions/:id', requisitionController.updateStatusById);
router.get('/getRequisitionNumber', requisitionController.getNextRequisitionID);
router.get('/viewPlaceRequisition', requisitionController.viewRequisitionByPlace);
router.post('/viewRequisitions', requisitionController.viewRequisitionByManagerID);

module.exports = router;
