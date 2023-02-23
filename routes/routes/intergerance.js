const router = require('express').Router();
const IntergeranceController = require("../../controllers/intergerance");


router.post('/add-partner-agency', IntergeranceController.addNewAgency);
router.post('/add-propriety', IntergeranceController.addNewPropriety);

module.exports = {
    router: router,
    basePath: '/'
};