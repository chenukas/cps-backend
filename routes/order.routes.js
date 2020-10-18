const router = require("express").Router();
const orderController = require("../controllers/order.controller");
const invoiceController = require("../controllers/invoice.controller");

router.get('/getOrderNumber', orderController.getNextOrderID);
router.post('/orders', orderController.addOrder);
router.get('/orders', orderController.viewOrder);
router.get('/orders/:id', orderController.viewOrderById);
router.put('/orders/:id/status', orderController.changeOrderState);
router.get('/orders/status/:status', orderController.viewDeliveredOrders);
router.get('/orders/:id/invoice', invoiceController.generateInvoice);

module.exports = router;