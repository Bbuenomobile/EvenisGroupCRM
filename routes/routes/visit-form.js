const router = require('express').Router();
const VisitFormController = require('../../controllers/visit-form');

router.post("/saveVisitForm", VisitFormController.saveVisitForm);
router.get("/visitorForm", VisitFormController.getVisitorForm)

module.exports = {
    router: router,
    basePath: '/'
};
