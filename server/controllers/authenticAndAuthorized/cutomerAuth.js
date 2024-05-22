const Customer = require('../../models/customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { email, password } = req.body;

    // Basic input validation
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        const existingUser = await Customer.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email is already in use');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newCustomer = new Customer({
            email: email,
            password: hashedPassword
        });

        await newCustomer.save();

        res.status(201).send('User created successfully',{ token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Server error');
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await Customer.findOne({ email });
        if (!existingUser) {
            return res.status(400).send('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid email or password');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: existingUser._id }, 'your_secret_key_here', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

exports.signout = (req, res) => {
    // No need to handle signout for JWT since tokens are stateless
    res.status(200).send('User signed out successfully');
};
