const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { firstName, secondName, firstLastName, secondLastName, genere, son, nomProcess, numDocument, email, password } = req.body;
    const userExist = await User.findOne({ numDocument });

    if (!firstName || !secondName || !firstLastName || !secondLastName || !email || !password) {
      return res.status(400).json({
        message: 'Todos los campos son obligatorios'
      })
    }

    if (userExist) {
      return res.status(400).json({
        message: 'El usuario ya está registrado',
      });
    }

    if (!['Grumete Regular', 'Grumete Administrativo', 'Cadete Naval'].includes(nomProcess)) {
      return res.status(400).json({
        message: 'Por favor, seleccione el proceso al que aspira'
      })
    }

    if (!['masculino', 'femenino'].includes(genere)) {
      return res.status(400).json({
        message: 'Por favor, seleccione un genero'
      })
    }

    if (!['Si', 'No'].includes(son)) {
      return res.status(400).json({
        message: 'Por favor seleccione una opcion'
      })
    }



    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      secondName,
      firstLastName,
      secondLastName,
      genere,
      son,
      nomProcess,
      numDocument,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({
      message: 'Registro exitoso'
    });

  } catch (error) {
    res.status(500).json({ message: 'Error en el registro', error });
  }
}

exports.login = async (req, res) => {
  try {
    const { numDocument, password } = req.body;
    const user = await User.findOne({ numDocument });

    if (!user) {
      return res.status(400).json({
        message: 'Usuario no encontrado',
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: 'Contraseña incorrecta',
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      token, user: {
        document: user.numDocument,
        name: user.firstName + ' ' + user.firstLastName,
        process: user.nomProcess
      }
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error al iniciar sesión',
      error
    });
  }
}
