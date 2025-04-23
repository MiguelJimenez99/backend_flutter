const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({
      message: 'Token invalido',
    })
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.id;
    next();
  } catch (error) {
    console.error('Error al verificar token:', error.message);
    res.status(400).json({ message: 'Token inválido o expirado.' });
  }
}

module.exports = verifyToken;