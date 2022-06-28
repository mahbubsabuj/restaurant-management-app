const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv/config");

//middlewares
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan("tiny"));

//routes
const usersRoutes = require('./routes/users');



app.use('/users', usersRoutes);
//connection

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "restaurant-database",
  })
  .then(() => {
    console.log("Connected to mongodb..");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT, () => {
  console.log(`server is running at http://localhost:${process.env.PORT}`);
});
