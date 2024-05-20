// const request = require('supertest'); // for mocking HTTP requests
// const bcrypt = require('bcrypt'); // for hashing password
// const mockingoose = require('mockingoose'); // for mocking models
// const Admin = require('../../../models/admin');
// const { signup, signin, signout } = require('../adminAuth');
// const app = require('../../../index');

// // Reset all mock data before each test
// beforeEach(() => {
//     mockingoose.resetAll();
// });

// // test the signup function
// describe('signup', () => {
//     it('should create a new user', async () => {
//         mockingoose(Admin).toReturn(null, 'findOne');
//         const hashedPassword = await bcrypt.hash('password123', 10);
//         mockingoose(Admin).toReturn({
//             _id: '507f191e810c19729de860ea',
//             email: 'test@example.com',
//             password: hashedPassword
//         }, 'save');

//         const res = await request(app)
//             .post('/admin/signup')
//             .send({ email: 'test@example.com', password: 'passnothing233' });

//         expect(res.status).toBe(200);
//         expect(res.text).toBe('User created successfully');
//     });

//     it('should return 400 if user already exists', async () => {
//         mockingoose(Admin).toReturn({
//             _id: '507f191e810c19729de860ea',
//             email: 'test@example.com',
//             password: 'hashedpassword'
//         }, 'findOne');

//         const res = await request(app)
//             .post('/admin/signup')
//             .send({ email: 'test@example.com', password: 'passnothing233' });

//         expect(res.status).toBe(400);
//         expect(res.text).toBe('Invalid email or password');
//     });

//     it('should return 500 if there is a server error', async () => {
//         mockingoose(Admin).toReturn(new Error('Database error'), 'findOne');

//         const res = await request(app)
//             .post('/admin/signup')
//             .send({ email: 'test@example.com', password: 'passnothing233' });

//         expect(res.status).toBe(500);
//         expect(res.text).toBe('Server error');
//     });

//     it('should return 400 if email or password is missing', async () => {
//         let res = await request(app)
//             .post('/admin/signup')
//             .send({ email: 'test@example.com' });

//         expect(res.status).toBe(400);

//         res = await request(app)
//             .post('/admin/signup')
//             .send({ password: 'passnothing233' });

//         expect(res.status).toBe(400);
//     });
// });

// // test the signin function
// describe('signin', () => {
//     it('should sign in a user with correct credentials', async () => {
//         const hashedPassword = await bcrypt.hash('passnothing233', 10);
//         mockingoose(Admin).toReturn({
//             _id: '507f191e810c19729de860ea',
//             email: 'test@example.com',
//             password: hashedPassword
//         }, 'findOne');

//         const res = await request(app)
//             .post('/signin')
//             .send({ email: 'test@example.com', password: 'passnothing233' });

//         expect(res.status).toBe(200);
//         expect(res.text).toBe('User signed in successfully');
//     });

//     it('should return 400 if email is incorrect', async () => {
//         mockingoose(Admin).toReturn(null, 'findOne');

//         const res = await request(app)
//             .post('/signin')
//             .send({ email: 'wrong@example.com', password: 'password123' });

//         expect(res.status).toBe(400);
//         expect(res.text).toBe('Invalid email or password');
//     });

//     it('should return 400 if password is incorrect', async () => {
//         const hashedPassword = await bcrypt.hash('password123', 10);
//         mockingoose(Admin).toReturn({
//             _id: '507f191e810c19729de860ea',
//             email: 'test@example.com',
//             password: hashedPassword
//         }, 'findOne');

//         const res = await request(app)
//             .post('/signin')
//             .send({ email: 'test@example.com', password: 'wrongpassword' });

//         expect(res.status).toBe(400);
//         expect(res.text).toBe('Invalid email or password');
//     });

//     it('should return 500 if there is a server error', async () => {
//         mockingoose(Admin).toReturn(new Error('Database error'), 'findOne');

//         const res = await request(app)
//             .post('/signin')
//             .send({ email: 'test@example.com', password: 'password123' });

//         expect(res.status).toBe(500);
//         expect(res.text).toBe('Server error');
//     });

//     it('should return 400 if email or password is missing', async () => {
//         let res = await request(app)
//             .post('/signin')
//             .send({ email: 'test@example.com' });

//         expect(res.status).toBe(400);

//         res = await request(app)
//             .post('/signin')
//             .send({ password: 'passnothing233' });

//         expect(res.status).toBe(400);
//     });
// });

// // test the signout function
// describe('signout', () => {
//     it('should sign out a user', async () => {
//         const res = await request(app)
//             .post('/signout')
//             .send();

//         expect(res.status).toBe(200);
//         expect(res.text).toBe('User signed out successfully');
//     });

//     it('should return 500 if there is a server error during sign out', async () => {
//         // Mock session destroy to call the callback with an error
//         req.session.destroy = (callback) => callback(new Error('Server error'));

//         const res = await request(app)
//             .post('/signout')
//             .send();

//         expect(res.status).toBe(500);
//         expect(res.text).toBe('Server error');
//     });
// });
