const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const getDataUser = require('../controllers/user.controller');
const { registrationValidator, loginValidator } = require('../validators/auth.validator');
const validate = require('../middleware/validate.middleware');
const verifyToken = require('../middleware/auth.middleware');


router.post('/register', registrationValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.get('/me', verifyToken, getDataUser.getUserProfile);

module.exports = router;