// customer model

const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adress:{type: String, required:true},
  phone:{type: Number, required:true}
});

const CustomerModel = mongoose.model('Customer', customerSchema);

module.exports = CustomerModel;




