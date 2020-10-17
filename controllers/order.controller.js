const Order = require('../models/order.model');
const Requisition = require('../models/requisition.model');
const mongoose = require("mongoose");
const siteModel = require('../models/site.model');
const userModel = require('../models/user.model');

const addOrder = (req, res) => {

  if(!req.body.orderID) {
      return res.status(400).json({
          success: false,
          message: "Order ID is undefined"
      });
  }

  if(!req.body.requisitionID){
      return res.status(400).json({
          success: false,
          message: "Requisition ID is undefined"
      });
  }

  const order = new Order(req.body);

  order.requisitionID = mongoose.Types.ObjectId(req.body.requisitionID);

  order.save()
  .then(() => {
      Requisition.findByIdAndUpdate(req.body.requisitionID, {
          place:true
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
    .then(result => {
      res.status(200).json({
          success: true,
          data: result
      });     
  }).catch(err => {
      res.status(500).json({
          success: false,
          message: err.message
      });
  });
};

const viewOrder = (req, res) => {
  Order.find({})
    .populate({
      path: 'requisitionID',
      populate: [
        {
          path: 'siteId',
          model: 'site'
        },
        {
          path: 'siteManagerId',
          model: 'User'
        },
        {
          path: 'supplierName',
          model: 'supplier'
        }
      ]
    })
    .then(result => {
      res.status(200).json({
        success: true,
        data: result
      });
    }).catch(err => {
      console.log(err);
      res.status(501).json({
        success: false,
        message: err.message
      });
    });
};

const viewOrderById = (req, res) => {
  Order.findById(req.params.id)
    .populate("requisitionID")
    .populate("requisitionID.items")
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

const changeOrderState = (req, res) => {
  Order.findByIdAndUpdate(
    req.params.id,
    {
      status: 'Delivered',
    },
    { new: true }
  ).then((result) => {
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

const viewDeliveredOrders = (req, res) => {
  Order.find({ status: req.params.status })
    .populate({
      path: 'requisitionID',
      populate: [
        {
          path: 'siteId',
          model: 'site'
        },
        {
          path: 'siteManagerId',
          model: 'User'
        },
        {
          path: 'supplierName',
          model: 'supplier'
        }
      ]
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
};

const getNextOrderID = (req, res) => {

  const start = new Date();
  start.setMonth(0, 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setMonth(11, 31);
  end.setHours(23, 59, 59, 999);

  Order.find({ createdAt: { $gt: start, $lt: end } }, "orderID")
    .sort("-createdAt")
    .then((result) => {
      let nextNum =
        result.length === 0
          ? 1
          : parseInt(result.shift().orderID.slice(-4)) + 1;

      const formattedCount = "000".concat(nextNum).slice(-4);
      return res.status(200).json({
        success: true,
        data: `O${start.getFullYear().toString().slice(-2)}${formattedCount}`,
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
  addOrder,
  viewOrder,
  viewOrderById,
  changeOrderState,
  viewDeliveredOrders,
  getNextOrderID
}