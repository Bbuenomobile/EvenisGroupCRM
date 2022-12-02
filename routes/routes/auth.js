const router = require('express').Router();

const authController = require('../../controllers/auth');

router.post('/signup', authController.Signup);

router.post('/signin', authController.Signin);

router.get("/auth", authController.Verify)

module.exports = {
    router: router,
    basePath: '/'
};
