const Supplier = require("../models/supplier.model");
const mongoose = require("mongoose");
const Item = require("../models/item.model");

//method to add supplier
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

//method to view all suppliers
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

//method to view supplier by Id
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

//method to update supplier details
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

//method to delete supplier
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

//method to get supplier by name
const supplierByName = (req, res) => {
  if (!req.body.supName) {
    return res.status(400).json({
      success: false,
      message: "Supplier name is undefined",
    });
  }

  let supName = req.body.supName;
  console.log(supName);

  Supplier.find(
    {
      supName: supName,
    },
    (err, suppliers) => {
      console.log("hhhhh");
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
      console.log("ddd");

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

//method to generate next supplier Id
const getNextSupID = (req, res) => {
  const start = new Date();
  start.setMonth(0, 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setMonth(11, 31);
  end.setHours(23, 59, 59, 999);

  Supplier.find({ createdAt: { $gt: start, $lt: end } }, "supId")
    .sort("-createdAt")
    .then((result) => {
      let nextNum =
        result.length === 0 ? 1 : parseInt(result.shift().supId.slice(-4)) + 1;

      const formattedCount = "000".concat(nextNum).slice(-4);
      return res.status(200).json({
        success: true,
        data: `SP${start.getFullYear().toString().slice(-2)}${formattedCount}`,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: err.message,
      })
    );
};

module.exports = {
  addSupplier,
  viewAllSuppliers,
  viewSupplierById,
  updateSupplierDetails,
  deleteSuppliers,
  supplierByName,
  getNextSupID,
};
