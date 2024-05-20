const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Order model
const orderSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    orderItems: [{
        cartItem: {
            type: Schema.Types.ObjectId,
            ref: 'Cart',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    billTotal: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
