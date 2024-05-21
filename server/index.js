const express = require("express");
const rateLimit = require('express-rate-limit');
const session = require('express-session');
var cookieParser = require('cookie-parser')

require("dotenv").config();

const connectToMongo = require("./db/connection");
const authAdminRoutes = require('./routes/authAdmin');
const adminRoutes = require('./routes/adminRouter');
 
const app = express();
app.use(cookieParser())
const sessionConfig = {
  secret: process.env.APP_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
  }
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session and rate limiter middleware
app.use(session(sessionConfig));
app.use(limiter);

// Mounting routers
app.use('/admin', authAdminRoutes, authAdminRoutes);
// app.use('/admin', adminRoutes, );
 
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

module.exports = app;
