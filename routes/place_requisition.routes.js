const router = require("express").Router();
const placerequsitionController = require("../controllers/place_requisition.controller");

router.post('/orders', placerequsitionController.addOrder);
router.get('/orders', placerequsitionController.viewOrder);

module.exports = router;