const express = require("express");
const adminAuthRouter = require('./routes/authAdmin');
const customerAuthRouter = require('./routes/authCustomer')
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const authAdminRoutes = require('./routes/authAdmin');
const adminRoutes = require('./routes/adminRouter')

require("dotenv").config();



const connectToMongo = require("./db/connection");

const app = express();
app.use('/admin', authAdminRoutes, adminRoutes);

const sessionConfig = {
  secret: process.env.APP_SECRET, //provid it when you make a .env enviremont 
  resave: false, //  
  saveUninitialized: true,  
  cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
  }
};

const limiter = rateLimit({
  windowMs: 15 * 60,
  max: 5,
  message: 'Too many requests from this IP, please try again later'
});


app.use(session(sessionConfig));
app.use(limiter);

app.use(bodyParser.json()); // Parse JSON bodies




// Mounting the authentication routers
app.use('/', adminAuthRouter);
app.use('/', customerAuthRouter);

const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

// Routes
// const adminRoutes = require("./routes/admin");
// const customerRoutes = require("./routes/customer");


// app.use('/admin', adminRoutes);
// app.use('/customer', customerRoutes);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

module.exports = app;

