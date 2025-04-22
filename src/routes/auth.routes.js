const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { registrationValidator, loginValidator } = require('../validators/auth.validator');
const validate = require('../middleware/validate.middleware');


router.post('/register', registrationValidator, validate, register);
router.post('/login', loginValidator, validate, login);

module.exports = router;