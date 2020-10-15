const Supplier = require("../models/supplier.model");
const mongoose = require("mongoose");
const Item = require("../models/item.model");

const addSupplier = (req, res) => {
  if (!req.body.supId) {
    return res.status(400).json({
      success: false,
      message: "Supplier ID is undefined",
    });
  }

  if (!req.body.supName) {
    return res.status(400).json({
      success: false,
      message: "Supplier name is undefined",
    });
  }

  const supplier = new Supplier(req.body);

  supplier
    .save()
    .then((result) => {
      res.status(200).json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

const viewAllSuppliers = (req, res) => {
  Supplier.find({})
    .populate("items")
    .then((result) => {
      res.status(200).json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      res.status(501).json({
        success: false,
        message: err.message,
      });
    });
};

const viewSupplierById = (req, res) => {
  Supplier.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      res.status(502).json({
        success: false,
        message: err.message,
      });
    });
};

const updateSupplierDetails = (req, res) => {
  if (!req.body.supId) {
    return res.status(400).json({
      success: false,
      message: "Supplier ID is undefined",
    });
  }

  if (!req.body.supName) {
    return res.status(400).json({
      success: false,
      message: "Supplier name is undefined",
    });
  }

  Supplier.findByIdAndUpdate(
    req.params.id,
    {
      supId: req.body.supId,
      supName: req.body.supName,
      supLocation: req.body.supLocation,
      supEmail: req.body.supEmail,
      supTel: req.body.supTel,
    },
    { new: true }
  )
    .then((result) => {
      res.status(200).json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      res.status(503).json({
        success: false,
        message: err.message,
      });
    });
};

const deleteSuppliers = (req, res) => {
  Supplier.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      res.status(504).json({
        success: false,
        message: err.message,
      });
    });
};

const supplierByName = (req, res) => {
  if (!req.body.supName) {
    return res.status(400).json({
      success: false,
      message: "Supplier name is undefined",
    });
  }

  let supName = req.body.supName;
  console.log(supName)

  Supplier.find({
      supName: supName,
    },
    (err, suppliers) => {
      console.log("hhhhh")
      if (err) {
        console.log("err 2:", err);
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      }
      if (suppliers.length !== 1) {
        return res.send({
          success: false,
          message: "Invalid Supplier",
        });
      }
      console.log("ddd")

      const supplier = suppliers[0];

      Supplier.findById(supplier._id)
      .populate("items")
      .then((result) => {
        res.status(200).json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        res.status(502).json({
          success: false,
          message: err.message,
        });
      });
    }
  );
};

module.exports = {
  addSupplier,
  viewAllSuppliers,
  viewSupplierById,
  updateSupplierDetails,
  deleteSuppliers,
  supplierByName
};
