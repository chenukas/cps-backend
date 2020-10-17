const router = require("express").Router();
const siteController = require("../controllers/site.controller");

router.post("/sites", siteController.addSite);
router.get("/sites", siteController.viewSites);
router.get("/sites/:id", siteController.viewSiteById);
router.put("/sites/:id", siteController.updateSiteDetails);
router.delete("/sites/:id", siteController.deleteSiteById);
router.get("/getSiteNumber", siteController.getNextSiteID);
router.put("/sites/:id/budget", siteController.uppdateBudgetWhenApproved);

module.exports = router;
