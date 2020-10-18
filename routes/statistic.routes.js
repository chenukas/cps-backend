const router = require("express").Router();
const statisticController = require("../controllers/statistic.controller");

//statistic routes
router.get(
  "/statistics/reqbystatus",
  statisticController.getRequisitionCountByStatus
);

module.exports = router;
