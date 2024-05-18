const express = require("express");
require("dotenv").config();

const connectToMongo = require("./db/connection");

const app = express();
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
