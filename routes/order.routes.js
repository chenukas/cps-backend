const router = require("express").Router();
const orderController = require("../controllers/order.controller");

/**
 * Order routes
 * */
router.get('/getOrderNumber', orderController.getNextOrderID);
router.post('/orders', orderController.addOrder);
router.get('/orders', orderController.viewOrder);
router.get('/orders/:id', orderController.viewOrderById);
router.put('/orders/:id/status', orderController.changeOrderState);
router.get('/orders/status/:status', orderController.viewDeliveredOrders);

module.exports = router;