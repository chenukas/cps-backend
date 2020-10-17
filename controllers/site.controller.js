const Site = require("../models/site.model");
const mongoose = require("mongoose");
//const user = require('../models/user.model');

const addSite = (req, res) => {
  if (!req.body.siteNo) {
    return res.status(400).json({
      success: false,
      message: "Site Number is undefined",
    });
  }

  if (!req.body.siteName) {
    return res.status(400).json({
      success: false,
      message: "Site name is undefined",
    });
  }

  const site = new Site(req.body);

  site
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

const viewSites = (req, res) => {
  Site.find({})
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

const viewSiteById = (req, res) => {
  Site.findById(req.params.id)
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

const updateSiteDetails = (req, res) => {
  if (!req.body.siteNo) {
    return res.status(400).json({
      success: false,
      message: "Site Number is undefined",
    });
  }

  if (!req.body.siteName) {
    return res.status(400).json({
      success: false,
      message: "Site name is undefined",
    });
  }

  Site.findByIdAndUpdate(
    req.params.id,
    {
      siteNo: req.body.siteNo,
      siteName: req.body.siteName,
      location: req.body.location,
      budget: req.body.budget,
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

const deleteSiteById = (req, res) => {
  Site.findByIdAndDelete(req.params.id)
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

const getNextSiteID = (req, res) => {
  const start = new Date();
  start.setMonth(0, 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setMonth(11, 31);
  end.setHours(23, 59, 59, 999);

  Site.find({ createdAt: { $gt: start, $lt: end } }, "siteNo")
    .sort("-createdAt")
    .then((result) => {
      let nextNum =
        result.length === 0 ? 1 : parseInt(result.shift().siteNo.slice(-4)) + 1;

      const formattedCount = "000".concat(nextNum).slice(-4);
      return res.status(200).json({
        success: true,
        data: `S${start.getFullYear().toString().slice(-2)}${formattedCount}`,
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
  addSite,
  viewSites,
  viewSiteById,
  updateSiteDetails,
  deleteSiteById,
  getNextSiteID,
};
