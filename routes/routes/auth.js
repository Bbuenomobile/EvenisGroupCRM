const router = require('express').Router();

const authController = require('../../controllers/auth');

router.post('/signup', authController.Signup);

router.post('/signin', authController.Signin);

router.get("/auth", authController.Verify)

router.get('/getAllAdmins', authController.getAllAdmins);

module.exports = {
    router: router,
    basePath: '/'
};
