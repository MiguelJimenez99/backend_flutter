const mongoose = require('mongoose');

const userShema = new mongoose.Schema({

  firstName: { type: String, required: true },
  secondName: { type: String },
  firstLastName: { type: String, required: true },
  secondLastName: { type: String },
  genere: {
    type: String, enum: ['masculino', 'femenino'], required: true
  },
  son: { type: String, enum: ['Si', 'No'], required: true },
  nomProcess: {
    type: String,
    enum: ['Grumete Regular', 'Grumete Administrativo', 'Cadete Naval'],
    required: true
  },
  numDocument: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
}, { timestamps: true });

const User = mongoose.model('User', userShema);

module.exports = User;