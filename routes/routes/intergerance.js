const router = require('express').Router();
const IntergeranceController = require("../../controllers/intergerance");


router.post('/add-partner-agency', IntergeranceController.addNewAgency);

module.exports = {
    router: router,
    basePath: '/'
};