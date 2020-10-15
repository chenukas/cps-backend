const router = require("express").Router();
const supplierController = require("../controllers/supplier.controller");

router.post("/suppliers", supplierController.addSupplier);
router.get("/suppliers", supplierController.viewAllSuppliers);
router.get("/suppliers/:id", supplierController.viewSupplierById);
router.put("/suppliers/:id", supplierController.updateSupplierDetails);
router.delete("/suppliers/:id", supplierController.deleteSuppliers);
router.post("/supplierItem", supplierController.supplierByName);

module.exports = router;
