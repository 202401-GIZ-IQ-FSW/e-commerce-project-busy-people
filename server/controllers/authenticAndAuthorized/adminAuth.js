const Admin = require('../../models/admin');
const bcrypt = require('bcrypt');


 



exports.signup = async (req, res) => {
    const { email, password } = req.body;

    // Basic input validation
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email is already in use');
        }

        // Hashing the password before inserting it into the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new Admin user
        const newAdmin = new Admin({
            email: email,
            password: hashedPassword
        });

        // Save the new admin to the database
        await newAdmin.save();

        // Set the user ID in the session
        req.session.userId = newAdmin._id;

        res.status(201).send('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Server error');
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const existingUser = await Admin.findOne({ email });
        if (!existingUser) {
            return res.status(400).send('Invalid email or password');
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid email or password');
        }

        // If email and password are correct, create session and respond
        // req.session.userId = existingUser._id;
res.cookie('userId', existingUser.id)

        res.status(200).send('User signed in successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};


exports.signout = (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error signing out');
            }
            res.clearCookie('connect.sid');
            res.status(200).send('User signed out successfully');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
