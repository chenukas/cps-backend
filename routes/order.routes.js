const router = require("express").Router();
const orderController = require("../controllers/order.controller");

router.post('/orders', orderController.addOrder);
router.get('/orders', orderController.viewOrder);
router.get('/getOrderNumber', orderController.getNextOrderID);

module.exports = router;