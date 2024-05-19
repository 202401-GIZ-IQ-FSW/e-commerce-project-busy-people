const Customer = require('../../models/customerSchema');
const bcrypt = require('bcrypt');


exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await Customer.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new customer
        const newCustomer = new Customer({
            email,
            password: hashedPassword
        });

        await newCustomer.save();

        // Set the session
        req.session.userId = newCustomer._id;

        // Respond with the created user details
        res.status(201).json({ message: 'User created successfully', user: newCustomer });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.signin = async(req, res)=> {
    const {email, password} = req.body;
    try{
        const findUser = await Customer.findOne({email});
        if(!findUser){
            return res.status(400).send('Invalid email or password');
        }
        // check if the sign in customer has the same password that inserted in the schema already
        const passwordMatch = await bcrypt.compare(password, findUser.password);
        //check if they are not the same
        if(!passwordMatch){
            return res.status(400).json({message: "Invalid email or password"})
        }

        req.session.userId = findUser._id;

        res.status(200).send('Signed in successfully');
    } catch (error) {
        res.status(500).send('Error signing in: ' + error.message);
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

