const router = require('express').Router();
const VisitFormController = require('../../controllers/visit-form');
const auth = require("../../middleware/auth");

router.post("/saveVisitForm", VisitFormController.saveVisitForm);
router.get("/visitorForm", VisitFormController.getVisitorForm);
router.get("/allSignedForms", VisitFormController.getSignedForms);

module.exports = {
    router: router,
    basePath: '/'
};
