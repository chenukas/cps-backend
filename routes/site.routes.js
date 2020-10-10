const router = require('express').Router();
const siteController = require('../controllers/site.controller');

router.post('/sites', siteController.addSite);
router.get('/sites', siteController.viewSites);
router.get('/sites/:id', siteController.viewSiteById);
router.put('/sites', siteController.updateSiteDetails);
router.delete('/sites/:id', siteController.deleteSiteById);

module.exports = router;