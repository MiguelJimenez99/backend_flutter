const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
  username: {type:String, required: true, unique:true},
  numDocument: {type: Number, required:true, unique:true},
  email: {type:String, required:true, unique:true},
  password:{type:String, required:true, },
},  { timestamps: true });

const User = mongoose.model('User', userShema);

module.exports = User;