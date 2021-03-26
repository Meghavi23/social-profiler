require('./util/config');
const express = require("express");
const bodyParser = require("body-parser");
const authentication = require('./util/jwt')
var cors = require('cors');

const User = require("./model/user");

//route
const userRoutes = require("./routes/user");

const app = express();

authentication.use();
app.use(authentication.passport.initialize());

//Body Parser for parsing request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Cross-origin resource sharing
app.use(cors());

//Route
app.use("/api/user", userRoutes);

User.sync()
    .then(() => {
        console.log("User table connected");
    })
    .catch(err => {
        console.log("connection failed", err);
    });

module.exports = app;
