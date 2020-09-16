const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const init = (app) => {
  app.use(bodyParser.json());
  app.use(cors());
};

module.exports = init;
