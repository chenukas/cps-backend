const Requsition = require("../models/requsition.model");
const mongoose = require("mongoose");

//View all the requsets
const viewRequsitions = (req, res) => {
  Requsition.find()
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

//Updating requests
const updateRequsition = (req, res) => {
  if (!req.body.reqNo) {
    return res.status(400).json({
      success: false,
      message: " Request number is undefined ",
    });
  }

  if (!req.body.reqName) {
    return res.status(400).json({
      success: false,
      message: " Request name is undefined ",
    });
  }

  Requsition.findByIdAndUpdate(
    req.params.id,
    {
      reqNo: req.body.reqNo,
      reqName: req.body.reqName,
      siteName: req.body.siteName,
      submitDate: req.body.submitDate,
      reqDate: req.body.reqDate,
      totAmount: req.body.totAmount,
      status: req.body.status,
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
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

module.exports = {
    viewRequsitions,
    updateRequsition
};
