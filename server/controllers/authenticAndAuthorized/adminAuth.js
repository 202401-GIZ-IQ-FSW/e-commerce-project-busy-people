const Admin = require('../../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../../utils/tokenUtils');

exports.signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email is already in use');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            email: email,
            password: hashedPassword
        });

        await newAdmin.save();

        // Generate JWT token
        const token = generateToken(newAdmin._id);

        res.status(201).json({ token, message: 'User created successfully' });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Server error');
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await Admin.findOne({ email });
        if (!existingUser) {
            return res.status(400).send('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid email or password');
        }

        // Generate JWT token
        const token = generateToken(existingUser._id);

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
