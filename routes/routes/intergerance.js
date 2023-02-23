const router = require('express').Router();
const IntergeranceController = require("../../controllers/intergerance");


router.post('/add-partner-agency', IntergeranceController.addNewAgency);
router.post('/add-propriety', IntergeranceController.addNewPropriety);
router.post('/save-intergerance-form', IntergeranceController.saveIntergeranceForm);

module.exports = {
    router: router,
    basePath: '/'
};