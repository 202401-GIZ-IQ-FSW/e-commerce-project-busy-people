// customer model

const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
   
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
   
});

const CustomerModel = mongoose.model('Customer', customerSchema);

module.exports = CustomerModel;




