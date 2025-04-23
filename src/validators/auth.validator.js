const { body } = require('express-validator');

exports.registrationValidator = [
  body('firstName').notEmpty().withMessage('El primer nombre no puede ir vacio'),
  body('firstLastName').notEmpty().withMessage('El primer apellido nombre no puede ir vacio'),
  body('numDocument').notEmpty().withMessage('El numero de documento es obligatorio'),
  body('genere').notEmpty().withMessage('El genero es obligatorio'),
  body('son').notEmpty().withMessage('Opcion Obligatoria'),
  body('nomProcess').notEmpty().withMessage('Seleccione el proceso al que aspira'),
  body('email').isEmail().withMessage('El email no puede ir vacio'),
  body('password').isLength().withMessage('La contraseña debe tener minimo seis caracteres').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

exports.loginValidator = [
  body('numDocument').isNumeric().withMessage('El documento es invalido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
]