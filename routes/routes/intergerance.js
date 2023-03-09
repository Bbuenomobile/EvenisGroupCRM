const router = require('express').Router();
const IntergeranceController = require("../../controllers/intergerance");

router.get("/get-agencies", IntergeranceController.getAllAgencies);
router.get("/get-properties", IntergeranceController.getAllProperties);
router.get("/get-intergerance-form", IntergeranceController.getIntergeranceForm);

router.post('/add-partner-agency', IntergeranceController.addNewAgency);
router.post('/add-propriety', IntergeranceController.addNewPropriety);
router.post('/save-intergerance-form', IntergeranceController.saveIntergeranceForm);
router.post('/submit-intergerance-form', IntergeranceController.submitIntergeranceForm);

router.get("/download-intergerance-form", IntergeranceController.prepareIntergeranceForm);
router.get('/get-all-signed-intergerances', IntergeranceController.allSignedIntergerances);

router.post('/filter-intergerance-forms', IntergeranceController.filterForms);

module.exports = {
    router: router,
    basePath: '/'
};