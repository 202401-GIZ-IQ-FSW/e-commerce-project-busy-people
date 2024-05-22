const request = require('supertest');// for mocking HTTP requests
const mockingoose = require('mockingoose'); // mocking models
const app = require('../../../index');
const Order = require('../../../models/order'); // Import Order model
const Customer = require('../../../models/customer'); // Import Customer model


//the functions that will be tested 
const { getAllOrders, getProfile, updateProfile, updateCart } = require('../customerController');

// reset all mock data before each test
beforeEach(()=>{
    mockingoose.resteAll();
});

//test suite for getallOrders
describe('getAllOrders', ()=>{
//test case: should return all orders for a customer
    it('should return all orders for a customer', async ()=>{
        //mock order.find to retrun a list of orders
        const orders = [{ _id: '1', item: 'item1' }, { _id: '2', item: 'item2' }];
        mockingoose(Order).toReturn(orders, 'find');

        //send  get request to /customer/orders with a mock or fake data
        const res = await request(app)
            .get('/customer/orders')
            .set('customerId', '507f1f77bcf86cd799439011'); // Mock customerId


            //expect status 200 and response body to match orders
            expect(res.status).toBe(200);
            expect(res.body).toEqual(orders);

    });

    // Test case: should handle server errors
    it('should handle server errors', async () => {
        // Mock Order.find to return an error
        mockingoose(Order).toReturn(new Error('Database error'), 'find');

        // Send GET request to /customer/orders with a mock customerId
        const res = await request(app)
            .get('/customer/orders')
            .set('customerId', '507f1f77bcf86cd799439011'); // Mock customerId

        // Expect status 500 and error message in response body
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Database error');
    });
});



// test suite for getProfile function

describe('getProfile', ()=> {
    //Test case: should return customer profile
    it('should return customer profile', async()=>{
        //mock customer.findByid to return a customer profile
        const customer = { _id: '507f1f77bcf86cd799439011', name: 'John Doe' };
        mockingoose(Customer).toReturn(customer, 'findOne');

        // send Get request to /customer/profile with a mock customerId
        const res = await request(app)
        .get('/customer/profile')
        .set('customerId', '507f1f77bcf86cd799439011'); // Mock customerId

        //expect the right status code and the body 
        expect(res.status).toBe(200);
        expect(res.body).toEqual(customer);

    });

    // Test case: should handle server errors
    it('should handle server errors', async () => {
        // Mock Customer.findById to return an error
        mockingoose(Customer).toReturn(new Error('Database error'), 'findOne');

        // Send GET request to /customer/profile with a mock customerId
        const res = await request(app)
            .get('/customer/profile')
            .set('customerId', '507f1f77bcf86cd799439011'); // Mock customerId

        // Expect status 500 and error message in response body
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Database error');
    });
});

// test suite for updateProfile function
describe('updateProfile', ()=>{
    //test case: should update and return customer profile
    it('should update and return customer profile', async()=>{
        // mock some data to return updates customer profile
        const updatedCustomer = { _id: '507f1f77bcf86cd799439011', name: 'John Doe Updated' };
        mockingoose(Customer).toReturn(updatedCustomer, 'findOneAndUpdate');


        // let's send some request to /customer/profile with updatd data
        const res = await request(app)
        .put('/customer/profile')
        .set('customerId', '507f1f77bcf86cd799439011') // Mock customerId
        .send({name: 'someone updated'});

        // Expect status 200 and response body to match updated customer profile
        expect(res.status).toBe(200);
        expect(res.body).toEqual(updatedCustomer);
    });

     // Test case: should handle server errors
     it('should handle server errors', async () => {
        // Mock Customer.findByIdAndUpdate to return an error
        mockingoose(Customer).toReturn(new Error('Database error'), 'findOneAndUpdate');

        // Send PUT request to /customer/profile with updated data and a mock customerId
        const res = await request(app)
            .put('/customer/profile')
            .set('customerId', '507f1f77bcf86cd799439011') // Mock customerId
            .send({ name: 'John Doe Updated' });

        // Expect status 400 and error message in response body
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Database error');
    });

});

// test suite for updateCart function
describe('updateCart', ()=>{
    // test case: should update the cart and return it 
    it('should update and return customer cart', async ()=>{
        //mock some data to return a customer with existing cart
        const customer = { _id: '507f1f77bcf86cd799439011', cart: [] };
        mockingoose(Customer).toReturn(customer, 'findOne');

        // mock customer.save to return upated customer with new cart
        const updatedCustomer = { _id: '507f1f77bcf86cd799439011', cart: ['item1', 'item2'] };
        mockingoose(Customer).toReturn(updatedCustomer, 'save');

        // let's send PUT request 
        const res = await request(app)
            .put('/customer/cart')
            .set('customerId', '507f1f77bcf86cd799439011') // Mock customerId
            .send({ cart: ['item1', 'item2'] });

        // Expect status 200 and response body to match updated customer cart
        expect(res.status).toBe(200);
        expect(res.body).toEqual(updatedCustomer);
    });

    // Test case: should handle server errors
    it('should handle server errors', async () => {
        // Mock Customer.findById to return a customer
        const customer = { _id: '507f1f77bcf86cd799439011', cart: [] };
        mockingoose(Customer).toReturn(customer, 'findOne');

        // Mock Customer.save to return an error
        mockingoose(Customer).toReturn(new Error('Database error'), 'save');

        // Send PUT request to /customer/cart with new cart data and a mock customerId
        const res = await request(app)
            .put('/customer/cart')
            .set('customerId', '507f1f77bcf86cd799439011') // Mock customerId
            .send({ cart: ['item1', 'item2'] });

        // Expect status 400 and error message in response body
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Database error');
    });

});