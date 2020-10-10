const Site = require('../models/site.model');

const addSite = (req, res) => {

    if(!req.body.siteNo) {
        return res.status(400).json({
            success: false,
            message: "Site Number is undefined"
        });
    }

    if(!req.body.siteName){
        return res.status(400).json({
            success: false,
            message: "Site name is undefined"
        });
    }

    const site = new Site(req.body);

    site.save().then(result => {
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

const viewSites = (req, res) => {
    Site.find({}).then(result => {
        res.status(200).json({
            success: true,
            data: result
        });
    }).catch(err => {
        res.status(501).json({
            success: false,
            message: err.message
        });
    });
};

const viewSiteById = (req, res) => {
    Site.findById(req.params.id).then(result => {
        res.status(200).json({
            success: true,
            data: result
        });
    }).catch(err => {
        res.status(502).json({
            success: false,
            message: err.message
        });
    });
};

const updateSiteDetails = (req, res) => {

    if(!req.body.siteNo) {
        return res.status(400).json({
            success: false,
            message: "Site Number is undefined"
        });
    }

    if(!req.body.siteName){
        return res.status(400).json({
            success: false,
            message: "Site name is undefined"
        });
    }

    Site.findByIdAndUpdate(req.params.id, {
        siteNo: req.body.siteNo,
        siteName: req.body.siteName,
        location: req.body.location,
        budget: req.body.budget
    }, {new: true}).then(result => {
        res.status(200).json({
            success: true,
            data: result
        });
    }).catch(err => {
        res.status(503).json({
            success: false,
            message: err.message
        });
    });
};

const deleteSiteById = (req, res) => {
    Site.findByIdAndDelete(req.params.id).then(result => {
        res.status(200).json({
            success: true,
            data: result
        });
    }).catch(err => {
        res.status(504).json({
            success: false,
            message: err.message
        });
    });
};

module.exports = {
    addSite,
    viewSites,
    viewSiteById,
    updateSiteDetails,
    deleteSiteById,
}