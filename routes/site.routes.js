const router = require('express').Router();
const siteController = require('../controllers/site.controller');

router.post('/sites', siteController.addSite);
router.get('/sites', siteController.viewSites);
router.get('/sites', siteController.viewSiteById);
router.put('/sites', siteController.updateDetails);
router.delete('/sites', siteController.deleteSiteById);

module.exports = router;