const router = require("express").Router();
const requsitionController = require("../controllers/requsition.controller");

router.post('/requsitions', requsitionController.addRequisition);
router.get('/requsitions', requsitionController.viewRequisition);
router.get('/requsitions/:id', requsitionController.viewRequisitionById);

module.exports = router;
