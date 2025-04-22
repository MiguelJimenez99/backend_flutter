const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, numDocument, email, password } = req.body;
    const userExist = await User.findOne({ numDocument });

    if (userExist) {
      return res.status(400).json({
        message: 'El usuario ya está registrado',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      numDocument,
      username,
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
    res.status(200).json({ token });
    
  } catch (error) {
    res.status(500).json({
      message: 'Error al iniciar sesión',
      error
    });
  }
}
