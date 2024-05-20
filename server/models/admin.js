const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // Ensures email uniqueness
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: true  
    }
});
// Create and export the Admin model
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;