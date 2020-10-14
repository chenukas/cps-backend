const router = require("express").Router();
const itemController = require("../controllers/item.controller");

router.post("/items", itemController.addItem);
router.get("/items", itemController.viewAllItems);
router.get("/items/:id", itemController.viewItemById);
router.put("/items/:id", itemController.updateItemById);
router.delete("/items/:id", itemController.deleteItemById);

module.exports = router;
