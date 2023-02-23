const router = require('express').Router();
const IntergeranceController = require("../../controllers/intergerance");

router.get("/get-agencies", IntergeranceController.getAllAgencies);
router.get("/get-properties", IntergeranceController.getAllProperties);
router.get("/get-intergerance-form", IntergeranceController.getIntergeranceForm);

router.post('/add-partner-agency', IntergeranceController.addNewAgency);
router.post('/add-propriety', IntergeranceController.addNewPropriety);
router.post('/save-intergerance-form', IntergeranceController.saveIntergeranceForm);

module.exports = {
    router: router,
    basePath: '/'
};