const siteRouter = require('../routes/site.routes');
const Site = require('../models/site.model');
const assert = require('assert');

describe("Add Site", () => {
    it("add a site in DB", () => {
        const site = new Site({
            siteNo:"S200002",
            siteName:"Altair",
            location:"Colombo 5"
        });
       site.save()
        .then(()=> {
            assert(!site.isNew);
        })
        .catch(()=> {
            console.log("error");
        })
    });
});

describe("View Site Details", ()=>{
    let site;
    /*beforeEach((done) => {
        site = Site({
            _id:"5f8a06f8072b9b31186ce355",
            siteName:"Altair",
            location:"Colombo 5"
        })
        site.save()
        .then(()=> {
            done();
        })
    })*/

    it("View Site", ()=> {
        Site.find({
            siteID:"5f8a06f8072b9b31186ce355"
        }).then(sites => {
            assert(site._id.toString() === sites[0]._id.toString());
            done();
        });
    });
});

