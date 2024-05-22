const express = require("express");
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const connectToMongo = require("./db/connection");
const authAdminRoutes = require('./routes/authAdmin');
const adminRoutes = require('./routes/adminRouter');
const authCustomer = require('./routes/authCustomer');
const customerRouter = require('./routes/customerRouter');

const app = express();

app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rate limiter middleware
app.use(limiter);

// Mounting routers
app.use('/admin', authAdminRoutes);
app.use('/admin', adminRoutes);
app.use('/customer', authCustomer);
app.use('/customer', customerRouter);
 
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

connectToMongo();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
