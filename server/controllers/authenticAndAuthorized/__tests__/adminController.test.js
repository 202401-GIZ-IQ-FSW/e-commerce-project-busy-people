const request = require('supertest');// for mocking the HTTP requests
const  mockingoose = require('mockingoose'); // for mocking some models
const bcrypt = require('bcrypt'); // for hashing some password
const app = require('../../../index');
const Order = require('../../../models/orderSchema');
const Customer = require('../../../models/customerSchema');
const Admin = require('../../../models/adminSchema');


const {getAllOrders, getAllCustomers, createAdminAccount} = require('../adminController');


// reset all mock data before each test

beforeEach(() => {
    mockingoose.resetAll();
});

//unit or suite test for getAllOrders functions
describe('getAllOrders', ()=> {
    //test case: should return all orders
    it('should return all orders', async()=>{
        //mock order.find to return a list of orders
        const orders = [{_id: '1', item: 'item1'}, {_id: '2', item: 'item2'}];
        mockingoose(Order).toReturn(orders, 'find');

        //send Get request to /admin/orders
        const res = await request(app).get('/admin/orders');

        
        //Expect status 200 and response body to match orders
        expect(res.status).toBe(200);
        expect(res.body).toEqual(orders);
    });

});


// Test suite for getAllCustomers function
describe('getAllCustomers', () => {
    // Test case: should return all customers
    it('should return all customers', async () => {
        // Mock Customer.find to return a list of customers
        const customers = [{ _id: '1', name: 'customer1' }, { _id: '2', name: 'customer2' }];
        mockingoose(Customer).toReturn(customers, 'find');

        // Send GET request to /admin/customers
        const res = await request(app).get('/admin/customers');

        // Expect status 200 and response body to match customers
        expect(res.status).toBe(200);
        expect(res.body).toEqual(customers);
    });

    // Test case: should return 404 if no customers are found
    it('should return 404 if no customers are found', async () => {
        // Mock Customer.find to return an empty list
        mockingoose(Customer).toReturn([], 'find');

        // Send GET request to /admin/customers
        const res = await request(app).get('/admin/customers');

        // Expect status 404 and appropriate message in response body
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No customers found');
    });

    // Test case: should handle server errors
    it('should handle server errors', async () => {
        // Mock Customer.find to return an error
        mockingoose(Customer).toReturn(new Error('Database error'), 'find');

        // Send GET request to /admin/customers
        const res = await request(app).get('/admin/customers');

        // Expect status 500 and error message in response body
        expect(res.status).toBe(500);
        expect(res.body.error).toBe('Database error');
    });
});


// Test suite for createAdminAccount function
describe('createAdminAccount', () => {
    // Test case: should create a new admin account
    it('should create a new admin account', async () => {
        // Admin data to be sent in the request
        const adminData = { email: 'admin@example.com', password: 'password123' };
        // Hash the password for comparison
        const hashedPassword = await bcrypt.hash(adminData.password, 10);

        // Mock Admin.save to return a new admin object
        mockingoose(Admin).toReturn({ _id: '1', email: adminData.email, password: hashedPassword, isAdmin: true }, 'save');

        // Send POST request to /admin/create with admin data
        const res = await request(app).post('/admin/create').send(adminData);

        // Expect status 201 and success message in response body
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('New admin account created successfully');
    });

    // Test case: should handle server errors
    it('should handle server errors', async () => {
        // Admin data to be sent in the request
        const adminData = { email: 'admin@example.com', password: 'password123' };
        // Mock Admin.save to return an error
        mockingoose(Admin).toReturn(new Error('Database error'), 'save');

        // Send POST request to /admin/create with admin data
        const res = await request(app).post('/admin/create').send(adminData);

        // Expect status 500 and error message in response body
        expect(res.status).toBe(500);
        expect(res.body.error).toBe('Database error');
    });

    // Test case: should return 400 if email or password is missing
    it('should return 400 if email or password is missing', async () => {
        // Send POST request to /admin/create with missing password
        let res = await request(app).post('/admin/create').send({ email: 'admin@example.com' });
        expect(res.status).toBe(400);

        // Send POST request to /admin/create with missing email
        res = await request(app).post('/admin/create').send({ password: 'password123' });
        expect(res.status).toBe(400);
    });
});
