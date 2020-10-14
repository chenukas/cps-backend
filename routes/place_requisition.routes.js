const router = require("express").Router();
const placerequsitionController = require("../controllers/place_requisition.controller");

router.post('/orders', placerequsitionController.addOrder);
router.get('/orders', placerequsitionController.viewOrder);
router.get('/getOrderNumber', placerequsitionController.getNextOrderID);

module.exports = router;