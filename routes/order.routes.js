const router = require("express").Router();
const orderController = require("../controllers/order.controller");

router.get('/getOrderNumber', orderController.getNextOrderID);
router.post('/orders', orderController.addOrder);
router.get('/orders', orderController.viewOrder);
router.get('/orders/:id', orderController.viewOrderById);

module.exports = router;