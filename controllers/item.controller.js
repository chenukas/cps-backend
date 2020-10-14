const Item = require("../models/item.model");
const Supplier = require("../models/supplier.model");
const mongoose = require("mongoose");
const { response } = require("express");

const addItem = (req, res) => {
  if (!req.body.itemName) {
    return res.status(400).json({
      success: false,
      message: "Item name is undefined",
    });
  }

  const item = new Item(req.body);

  item.supplier = mongoose.Types.ObjectId(req.body.supplier);

  item
    .save()
    .then((i) => {
      Supplier.findByIdAndUpdate(req.body.supplier, {
        $push: {
          items: mongoose.Types.ObjectId(i._id),
        },
      })
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
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

const viewAllItems = (req, res) => {
  Item.find({})
    .populate("supplier")
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

const viewItemById = (req, res) => {
  Item.findById(req.params.id)
    .populate("supplier")
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

const updateItemById = (req, res) => {
  if (!req.body.itemName) {
    return res.status(400).json({
      success: false,
      message: "Item name is undefined",
    });
  }

  Item.findByIdAndUpdate(
    req.params.id,
    {
      itemName: req.body.itemName,
      quantity: req.body.quantity,
      unitPrice: req.body.unitPrice,
      description: req.body.description,
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

const deleteItemById = (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json({
        success: true,
        data: result,
      });
    })
    .then((s) => {
      Supplier.findOneAndUpdate(
        {
          items: mongoose.Types.ObjectId(req.params.id),
        },
        {
          $pullAll: {
            items: [mongoose.Types.ObjectId(req.params.id)],
          },
        }
      )
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
    })
    .catch((err) => {
      res.status(504).json({
        success: false,
        message: err.message,
      });
    });
};

module.exports = {
  addItem,
  viewAllItems,
  viewItemById,
  updateItemById,
  deleteItemById,
};
