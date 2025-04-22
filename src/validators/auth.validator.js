const { body } = require('express-validator');

exports.registrationValidator = [
  body('numDocument').notEmpty().withMessage('El numero de documento es obligatorio'),
  body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('email').isEmail().withMessage('El correo es invalido'),
  body('password').isLength().withMessage('La contraseña debe tener minimo seis caracteres').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

exports.loginValidator = [
  body('numDocument').isNumeric().withMessage('El documento es invalido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
]