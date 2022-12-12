const router = require('express').Router();
const VisitFormController = require('../../controllers/visit-form');

router.post("/saveVisitForm", VisitFormController.saveVisitForm);

module.exports = {
    router: router,
    basePath: '/'
};
