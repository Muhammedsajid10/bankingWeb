const express = require('express');
const { register, login, loginAdmin } = require('../Controller/authController');
const router = express.Router()


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/adminLogin').post(loginAdmin)


module.exports = router;