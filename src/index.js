const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.routes.js');
app.use('/api/auth', authRoutes);
app.use('/api', authRoutes);

mongoose.connect(process.env.DB_CONNECT)
  .then(() => console.log('MongoDb conectado correctamente'))
  .catch((err) => console.log('Error al establecer la coneccion', err))

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});